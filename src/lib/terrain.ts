/**
 * Deterministic terrain generation for the mandate search universe.
 *
 * Everything here runs at build time and emits plain SVG path data, so the map
 * renders identically with JavaScript disabled and never shifts layout.
 * A fixed seed keeps the output byte-stable between builds.
 */

export interface Point {
  readonly x: number;
  readonly y: number;
}

/** A gaussian bump: one cluster of target companies in the universe. */
export interface Bump {
  readonly x: number;
  readonly y: number;
  /** Standard deviation in viewBox units. */
  readonly sigma: number;
  /** Peak height, roughly "how much evidence supports this cluster". */
  readonly amp: number;
}

/* -------------------------------------------------------------------------- */
/* Pseudo-random source                                                        */
/* -------------------------------------------------------------------------- */

/** mulberry32 — small, fast, and identical on every platform. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* -------------------------------------------------------------------------- */
/* Value noise                                                                 */
/* -------------------------------------------------------------------------- */

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

/**
 * Lattice value noise with smoothstep interpolation. Cheap, and at the scale we
 * use it (a subtle roughening of gaussian bumps) indistinguishable from anything
 * more sophisticated.
 */
function makeValueNoise(rand: () => number, size: number): (x: number, y: number) => number {
  const lattice = new Float64Array(size * size);
  for (let i = 0; i < lattice.length; i++) lattice[i] = rand();

  const at = (ix: number, iy: number): number => {
    const wx = ((ix % size) + size) % size;
    const wy = ((iy % size) + size) % size;
    return lattice[wy * size + wx] ?? 0;
  };

  return (x, y) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = smoothstep(x - x0);
    const fy = smoothstep(y - y0);
    const v00 = at(x0, y0);
    const v10 = at(x0 + 1, y0);
    const v01 = at(x0, y0 + 1);
    const v11 = at(x0 + 1, y0 + 1);
    const top = v00 + (v10 - v00) * fx;
    const bottom = v01 + (v11 - v01) * fx;
    return top + (bottom - top) * fy;
  };
}

/** Fractal sum of value noise, normalized to roughly [0, 1]. */
function makeFbm(rand: () => number, octaves: number): (x: number, y: number) => number {
  const noise = makeValueNoise(rand, 64);
  return (x, y) => {
    let sum = 0;
    let amp = 1;
    let freq = 1;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += noise(x * freq, y * freq) * amp;
      norm += amp;
      amp *= 0.5;
      freq *= 2.07;
    }
    return norm === 0 ? 0 : sum / norm;
  };
}

/* -------------------------------------------------------------------------- */
/* Scalar field                                                                */
/* -------------------------------------------------------------------------- */

export interface Field {
  readonly cols: number;
  readonly rows: number;
  readonly width: number;
  readonly height: number;
  readonly values: Float64Array;
  sample(col: number, row: number): number;
}

/**
 * Build a scalar field over the viewBox from a set of bumps plus light noise.
 * `noiseAmount` of 0 gives clean ellipses; the default keeps contours organic
 * without making them look random.
 */
export function buildField(
  bumps: readonly Bump[],
  opts: {
    width: number;
    height: number;
    cols: number;
    rows: number;
    seed: number;
    noiseAmount?: number;
    noiseScale?: number;
  },
): Field {
  const { width, height, cols, rows, seed } = opts;
  const noiseAmount = opts.noiseAmount ?? 0.17;
  const noiseScale = opts.noiseScale ?? 3.1;

  const fbm = makeFbm(mulberry32(seed), 4);
  const values = new Float64Array(cols * rows);

  for (let row = 0; row < rows; row++) {
    const y = (row / (rows - 1)) * height;
    for (let col = 0; col < cols; col++) {
      const x = (col / (cols - 1)) * width;

      let total = 0;
      for (const b of bumps) {
        const dx = x - b.x;
        const dy = y - b.y;
        total += b.amp * Math.exp(-(dx * dx + dy * dy) / (2 * b.sigma * b.sigma));
      }

      // Noise is scaled by local height so the empty margins stay flat and the
      // map keeps a calm, surveyed feel rather than a noisy one.
      const n = fbm((x / width) * noiseScale, (y / height) * noiseScale) - 0.5;
      values[row * cols + col] = total + n * noiseAmount * Math.min(1, total * 2.2);
    }
  }

  return {
    cols,
    rows,
    width,
    height,
    values,
    sample(col: number, row: number): number {
      if (col < 0 || row < 0 || col >= cols || row >= rows) return 0;
      return values[row * cols + col] ?? 0;
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Marching squares                                                            */
/* -------------------------------------------------------------------------- */

/** Edge ids: 0 top, 1 right, 2 bottom, 3 left. */
const CASES: readonly (readonly (readonly [number, number])[])[] = [
  [], // 0000
  [[3, 2]], // 0001
  [[2, 1]], // 0010
  [[3, 1]], // 0011
  [[1, 0]], // 0100
  [[3, 0], [1, 2]], // 0101 saddle
  [[2, 0]], // 0110
  [[3, 0]], // 0111
  [[0, 3]], // 1000
  [[0, 2]], // 1001
  [[0, 1], [2, 3]], // 1010 saddle
  [[0, 1]], // 1011
  [[1, 3]], // 1100
  [[1, 2]], // 1101
  [[2, 3]], // 1110
  [], // 1111
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Crossing fraction along an edge between two corner values. */
function crossing(v0: number, v1: number, threshold: number): number {
  const d = v1 - v0;
  if (Math.abs(d) < 1e-9) return 0.5;
  const t = (threshold - v0) / d;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

interface Segment {
  a: Point;
  b: Point;
}

/**
 * Extract iso-lines at `threshold`, returned as polylines in viewBox units.
 * Closed rings repeat their first point, which lets the caller fill them.
 */
export function marchingSquares(field: Field, threshold: number): Point[][] {
  const { cols, rows, width, height } = field;
  const cellW = width / (cols - 1);
  const cellH = height / (rows - 1);
  const segments: Segment[] = [];

  for (let row = 0; row < rows - 1; row++) {
    for (let col = 0; col < cols - 1; col++) {
      const tl = field.sample(col, row);
      const tr = field.sample(col + 1, row);
      const br = field.sample(col + 1, row + 1);
      const bl = field.sample(col, row + 1);

      let index = 0;
      if (tl >= threshold) index |= 8;
      if (tr >= threshold) index |= 4;
      if (br >= threshold) index |= 2;
      if (bl >= threshold) index |= 1;

      const cases = CASES[index];
      if (!cases || cases.length === 0) continue;

      const x0 = col * cellW;
      const y0 = row * cellH;

      const edgePoint = (edge: number): Point => {
        switch (edge) {
          case 0:
            return { x: x0 + cellW * crossing(tl, tr, threshold), y: y0 };
          case 1:
            return { x: x0 + cellW, y: y0 + cellH * crossing(tr, br, threshold) };
          case 2:
            return { x: x0 + cellW * crossing(bl, br, threshold), y: y0 + cellH };
          default:
            return { x: x0, y: y0 + cellH * crossing(tl, bl, threshold) };
        }
      };

      // Saddle disambiguation by the cell's average value.
      let resolved = cases;
      if (index === 5 || index === 10) {
        const center = (tl + tr + br + bl) / 4;
        const flip = center >= threshold;
        if ((index === 5 && flip) || (index === 10 && !flip)) {
          resolved = [
            [cases[0]![1], cases[1]![0]] as const,
            [cases[1]![1], cases[0]![0]] as const,
          ];
        }
      }

      for (const [from, to] of resolved) {
        segments.push({ a: edgePoint(from), b: edgePoint(to) });
      }
    }
  }

  return stitch(segments, Math.min(cellW, cellH) * 0.5);
}

/** Join loose segments into polylines by matching endpoints on a quantized grid. */
function stitch(segments: readonly Segment[], tolerance: number): Point[][] {
  if (segments.length === 0) return [];
  const q = Math.max(tolerance, 1e-4);
  const key = (p: Point): string => `${Math.round(p.x / q)}:${Math.round(p.y / q)}`;

  const byPoint = new Map<string, number[]>();
  segments.forEach((seg, i) => {
    for (const k of [key(seg.a), key(seg.b)]) {
      const list = byPoint.get(k);
      if (list) list.push(i);
      else byPoint.set(k, [i]);
    }
  });

  const used = new Array<boolean>(segments.length).fill(false);
  const lines: Point[][] = [];

  const nextFrom = (point: Point, exclude: number): number => {
    const candidates = byPoint.get(key(point));
    if (!candidates) return -1;
    for (const i of candidates) {
      if (i !== exclude && !used[i]) return i;
    }
    return -1;
  };

  for (let i = 0; i < segments.length; i++) {
    if (used[i]) continue;
    const seed = segments[i]!;
    used[i] = true;
    const line: Point[] = [seed.a, seed.b];

    // Extend forward from the tail.
    let cursor = i;
    for (;;) {
      const tail = line[line.length - 1]!;
      const next = nextFrom(tail, cursor);
      if (next === -1) break;
      const seg = segments[next]!;
      used[next] = true;
      cursor = next;
      line.push(key(seg.a) === key(tail) ? seg.b : seg.a);
      if (key(line[line.length - 1]!) === key(line[0]!)) break;
    }

    // Extend backward from the head, unless we already closed the ring.
    if (key(line[line.length - 1]!) !== key(line[0]!)) {
      cursor = i;
      for (;;) {
        const head = line[0]!;
        const prev = nextFrom(head, cursor);
        if (prev === -1) break;
        const seg = segments[prev]!;
        used[prev] = true;
        cursor = prev;
        line.unshift(key(seg.a) === key(head) ? seg.b : seg.a);
        if (key(line[0]!) === key(line[line.length - 1]!)) break;
      }
    }

    if (line.length > 2) lines.push(line);
  }

  return lines;
}

/* -------------------------------------------------------------------------- */
/* Simplification and serialization                                            */
/* -------------------------------------------------------------------------- */

function perpendicularDistance(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return Math.hypot(p.x - lerp(a.x, b.x, t), p.y - lerp(a.y, b.y, t));
}

/** Douglas–Peucker. Keeps the SVG small without visibly changing the contours. */
export function simplify(points: readonly Point[], epsilon: number): Point[] {
  if (points.length < 3) return [...points];
  const first = points[0]!;
  const last = points[points.length - 1]!;

  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i]!, first, last);
    if (d > maxDist) {
      maxDist = d;
      index = i;
    }
  }

  if (maxDist <= epsilon) return [first, last];

  const left = simplify(points.slice(0, index + 1), epsilon);
  const right = simplify(points.slice(index), epsilon);
  return [...left.slice(0, -1), ...right];
}

const round = (n: number): string => {
  const r = Math.round(n * 10) / 10;
  return Object.is(r, -0) ? '0' : String(r);
};

/** Serialize a polyline to SVG path data, closing it when it forms a ring. */
export function toPath(points: readonly Point[]): string {
  if (points.length === 0) return '';
  const head = points[0]!;
  const tail = points[points.length - 1]!;
  const closed = Math.hypot(tail.x - head.x, tail.y - head.y) < 0.75;
  const body = closed ? points.slice(0, -1) : points;

  let d = `M${round(body[0]!.x)} ${round(body[0]!.y)}`;
  for (let i = 1; i < body.length; i++) {
    d += `L${round(body[i]!.x)} ${round(body[i]!.y)}`;
  }
  return closed ? `${d}Z` : d;
}

/** Smooth open polyline through waypoints, used for the research traverse. */
export function toSmoothPath(points: readonly Point[], tension = 0.35): string {
  if (points.length < 2) return '';
  if (points.length === 2) {
    return `M${round(points[0]!.x)} ${round(points[0]!.y)}L${round(points[1]!.x)} ${round(points[1]!.y)}`;
  }

  let d = `M${round(points[0]!.x)} ${round(points[0]!.y)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;

    const c1 = { x: p1.x + ((p2.x - p0.x) * tension) / 2, y: p1.y + ((p2.y - p0.y) * tension) / 2 };
    const c2 = { x: p2.x - ((p3.x - p1.x) * tension) / 2, y: p2.y - ((p3.y - p1.y) * tension) / 2 };
    d += `C${round(c1.x)} ${round(c1.y)} ${round(c2.x)} ${round(c2.y)} ${round(p2.x)} ${round(p2.y)}`;
  }
  return d;
}

/** Contour set at several levels, simplified and ready to emit. */
export function contourSet(
  field: Field,
  levels: readonly number[],
  epsilon = 1.1,
): { level: number; paths: string[] }[] {
  return levels.map((level) => ({
    level,
    paths: marchingSquares(field, level)
      .map((line) => simplify(line, epsilon))
      .filter((line) => line.length > 2)
      .map(toPath)
      .filter((d) => d.length > 0),
  }));
}
