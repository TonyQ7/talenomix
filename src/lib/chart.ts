/**
 * Build-time, accessible SVG primitives.
 *
 * Everything here runs during the build and emits plain markup: no runtime
 * charting library, no client-side layout, nothing that can shift after paint.
 * Each primitive carries its own `<title>` and an `aria-label`, and every
 * animated stroke uses `pathLength="1"` so the draw-in timing is independent of
 * the actual geometry. Motion is opt-in via `.js-reveal` and disabled entirely
 * under `prefers-reduced-motion` — see src/styles/motion.css.
 */

function escape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;');
}

/** Round to one decimal and drop a trailing `.0`, keeping path data compact. */
function n(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Object.is(rounded, -0) ? '0' : String(rounded);
}

/* -------------------------------------------------------------------------- */
/* Existing primitives (market page)                                           */
/* -------------------------------------------------------------------------- */

export function barRow(label: string, value: number, max: number, suffix = ''): string {
  const width = Math.max(0, Math.min(100, (value / max) * 100));
  return `<svg class="market-bar" viewBox="0 0 640 54" role="img" aria-label="${escape(
    `${label}: ${value}${suffix}`,
  )}">
    <title>${escape(`${label}: ${value}${suffix}`)}</title>
    <text x="0" y="19">${escape(label)}</text>
    <rect x="210" y="7" width="350" height="18" rx="3" class="market-bar__track"/>
    <rect x="210" y="7" width="${n((350 * width) / 100)}" height="18" rx="3" class="market-bar__value"/>
    <text x="575" y="20" class="market-bar__number">${escape(`${value}${suffix}`)}</text>
  </svg>`;
}

export function dotPlot(
  label: string,
  value: number,
  min: number,
  max: number,
  suffix = '',
): string {
  const x = 40 + ((value - min) / (max - min)) * 520;
  return `<svg class="market-dot" viewBox="0 0 640 68" role="img" aria-label="${escape(
    `${label}: ${value}${suffix}`,
  )}">
    <title>${escape(`${label}: ${value}${suffix}`)}</title>
    <text x="0" y="18">${escape(label)}</text>
    <line x1="40" y1="45" x2="560" y2="45"/>
    <circle cx="${n(x)}" cy="45" r="7"/>
    <text x="575" y="50" class="market-bar__number">${escape(`${value}${suffix}`)}</text>
  </svg>`;
}

export function sparkline(label: string, values: readonly number[]): string {
  if (values.length < 2) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values
    .map((value, index) => {
      const x = 12 + (index / (values.length - 1)) * 196;
      const y = 52 - ((value - min) / Math.max(1, max - min)) * 40;
      return `${n(x)},${n(y)}`;
    })
    .join(' ');
  return `<svg class="sparkline" viewBox="0 0 220 64" role="img" aria-label="${escape(
    label,
  )}"><title>${escape(label)}</title><polyline points="${points}"/></svg>`;
}

/* -------------------------------------------------------------------------- */
/* Dashboard primitives                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Ring gauge. `value` of `max` as an arc, with the remainder shown as track.
 * A null value renders an explicitly "unknown" dashed ring rather than a zero —
 * an empty gauge and an unmeasured gauge must not look the same.
 */
export function ringGauge(
  label: string,
  value: number | null,
  max: number,
  display: string,
): string {
  const R = 52;
  const known = value !== null && max > 0;
  const frac = known ? Math.max(0, Math.min(1, value / max)) : 0;
  const aria = known ? `${label}: ${display}` : `${label}: not published`;

  return `<svg class="gauge${known ? '' : ' gauge--unknown'}" viewBox="0 0 120 120" role="img" aria-label="${escape(aria)}">
    <title>${escape(aria)}</title>
    <circle class="gauge__track" cx="60" cy="60" r="${R}" fill="none"/>
    ${
      known
        ? `<circle class="gauge__value" cx="60" cy="60" r="${R}" fill="none"
             pathLength="1" stroke-dasharray="${n(frac)} 1" style="--frac:${n(frac)}"
             transform="rotate(-90 60 60)"/>`
        : `<circle class="gauge__unknown" cx="60" cy="60" r="${R}" fill="none"
             stroke-dasharray="4 7" transform="rotate(-90 60 60)"/>`
    }
    <text class="gauge__display" x="60" y="60" text-anchor="middle" dominant-baseline="central">${escape(display)}</text>
  </svg>`;
}

export interface Segment {
  readonly label: string;
  readonly value: number;
  /** Maps to a `.stackbar__seg--{state}` class so pattern and colour both apply.
   *  Named `stackbar`, not `stack`: `.stack` is already the layout utility in
   *  base.css, and the collision silently crushed the demo's table wrapper. */
  readonly state: 'resolved' | 'review' | 'unresolved' | 'excluded';
}

/**
 * Horizontal composition bar. Segments are drawn as one path each so they can
 * animate in sequence; the accessible name spells out the whole composition,
 * because a screen-reader user should not have to infer it from four rectangles.
 */
export function stackedBar(label: string, segments: readonly Segment[]): string {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total <= 0) return '';
  const W = 640;
  const H = 22;
  let x = 0;

  const parts = segments
    .filter((s) => s.value > 0)
    .map((s, i) => {
      const w = (s.value / total) * W;
      const rect = `<rect class="stackbar__seg stackbar__seg--${s.state}" x="${n(x)}" y="0" width="${n(w)}" height="${H}" style="--seg-index:${i}"><title>${escape(`${s.label}: ${s.value}`)}</title></rect>`;
      x += w;
      return rect;
    })
    .join('');

  const aria = `${label}. ${segments.map((s) => `${s.label} ${s.value}`).join(', ')}. Total ${total}.`;
  return `<svg class="stackbar" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${escape(aria)}">
    <title>${escape(aria)}</title>${parts}
  </svg>`;
}

/**
 * Trend line with a soft area fill. Used for the few series where we genuinely
 * have more than one period; never invent intermediate points to make a line
 * look smoother than the data.
 */
export function areaTrend(label: string, values: readonly number[], suffix = ''): string {
  if (values.length < 2) return '';
  const W = 260;
  const H = 76;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1e-6, max - min);

  const pt = (v: number, i: number): [number, number] => [
    8 + (i / (values.length - 1)) * (W - 16),
    H - 12 - ((v - min) / span) * (H - 28),
  ];

  const pts = values.map(pt);
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${n(x)} ${n(y)}`).join('');
  const first = pts[0]!;
  const last = pts[pts.length - 1]!;
  const area = `${line}L${n(last[0])} ${H - 4}L${n(first[0])} ${H - 4}Z`;
  const latest = values[values.length - 1]!;

  return `<svg class="trend" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escape(
    `${label}: ${values.join(', ')}${suffix}`,
  )}">
    <title>${escape(`${label}: ${values.join(', ')}${suffix}`)}</title>
    <path class="trend__area" d="${area}"/>
    <path class="trend__line" d="${line}" fill="none" pathLength="1"/>
    <circle class="trend__head" cx="${n(last[0])}" cy="${n(last[1])}" r="3.5"/>
    <text class="trend__value" x="${W - 8}" y="14" text-anchor="end">${escape(`${latest}${suffix}`)}</text>
  </svg>`;
}

/**
 * Vertical histogram over labelled bands.
 *
 * Each bar carries `data-band` so a CSS-only scope control can dim the bars
 * outside the selected band without any script. Counts are printed above the
 * bars rather than left to be read off an axis — this is a small dataset shown
 * to people who will want the exact number.
 */
export function histogram(
  label: string,
  bars: readonly { band: string; count: number }[],
): string {
  if (bars.length === 0) return '';
  const W = 480;
  const H = 150;
  const plot = H - 42;
  const max = Math.max(...bars.map((b) => b.count));
  const slot = W / bars.length;
  const bw = slot * 0.62;

  const parts = bars
    .map((b, i) => {
      const h = max > 0 ? (b.count / max) * plot : 0;
      const x = i * slot + (slot - bw) / 2;
      const y = plot - h + 18;
      return `<g class="hist__group" data-band="${escape(b.band)}" style="--bar-index:${i}">
        <text class="hist__count" x="${n(x + bw / 2)}" y="${n(y - 5)}" text-anchor="middle">${b.count}</text>
        <rect class="hist__bar" x="${n(x)}" y="${n(y)}" width="${n(bw)}" height="${n(Math.max(1, h))}" rx="2"/>
        <text class="hist__label" x="${n(x + bw / 2)}" y="${H - 8}" text-anchor="middle">${escape(b.band)}</text>
      </g>`;
    })
    .join('');

  const aria = `${label}. ${bars.map((b) => `${b.band}: ${b.count}`).join(', ')}.`;
  return `<svg class="hist" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escape(aria)}">
    <title>${escape(aria)}</title>
    <line class="hist__axis" x1="0" y1="${plot + 18}" x2="${W}" y2="${plot + 18}"/>
    ${parts}
  </svg>`;
}

/**
 * Small-multiple country strip: one cell per market, filled where a published
 * figure exists and hatched where it does not. This is the coverage argument
 * rendered as a picture — the gaps are the point, so they are drawn, not hidden.
 */
export function coverageStrip(
  label: string,
  cells: readonly { code: string; known: boolean }[],
): string {
  const cw = 56;
  const gap = 8;
  const W = cells.length * cw + (cells.length - 1) * gap;
  const H = 46;

  const parts = cells
    .map((c, i) => {
      const x = i * (cw + gap);
      return `<g class="strip__cell${c.known ? ' is-known' : ''}" style="--cell-index:${i}">
        <rect x="${n(x)}" y="0" width="${cw}" height="26" rx="2"/>
        <text x="${n(x + cw / 2)}" y="42" text-anchor="middle">${escape(c.code)}</text>
      </g>`;
    })
    .join('');

  const known = cells.filter((c) => c.known).map((c) => c.code);
  const missing = cells.filter((c) => !c.known).map((c) => c.code);
  const aria = `${label}. Published: ${known.length ? known.join(', ') : 'none'}. In review: ${
    missing.length ? missing.join(', ') : 'none'
  }.`;

  return `<svg class="strip" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escape(aria)}">
    <title>${escape(aria)}</title>
    <defs>
      <pattern id="strip-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="1.2" stroke-opacity="0.4"/>
      </pattern>
    </defs>
    ${parts}
  </svg>`;
}
