/**
 * The mandate search universe: the scene behind every map on the site.
 *
 * PLAN.md section 3 asks for target companies as clusters and contours, evidence
 * depth as terrain strength, visually distinct resolved / excluded / unresolved
 * areas, a traverse from brief to approved coverage, and the calibration pack as
 * the final artifact. That is exactly what this module assembles.
 *
 * The segments below match the synthetic scenario in src/data/demo.ts so the map
 * and the demo tell the same story. Everything is fictional.
 */

import type { CoverageState } from '~/types/domain';
import { buildField, contourSet, toSmoothPath, type Bump, type Point } from './terrain';

export type MapVariant = 'hero' | 'full';

export interface UniverseCluster extends Bump {
  readonly id: string;
  readonly code: string;
  readonly segmentKey: string;
  readonly state: CoverageState;
}

export interface Waypoint extends Point {
  readonly n: string;
  readonly key: string;
}

export interface UniverseScene {
  readonly width: number;
  readonly height: number;
  readonly contours: { level: number; paths: string[] }[];
  readonly zones: { state: CoverageState; paths: string[] }[];
  readonly clusters: readonly UniverseCluster[];
  readonly traverse: string;
  readonly waypoints: readonly Waypoint[];
  readonly gridX: readonly number[];
  readonly gridY: readonly number[];
}

const SEED = 20260725;

/** Six fictional segments of the target universe. */
const CLUSTERS: readonly UniverseCluster[] = [
  {
    id: 'c-precision',
    code: 'SEG-01',
    segmentKey: 'precision',
    state: 'included',
    x: 300,
    y: 248,
    sigma: 120,
    amp: 0.96,
  },
  {
    id: 'c-automation',
    code: 'SEG-02',
    segmentKey: 'automation',
    state: 'included',
    x: 474,
    y: 436,
    sigma: 102,
    amp: 0.83,
  },
  {
    id: 'c-process',
    code: 'SEG-03',
    segmentKey: 'process',
    state: 'included',
    x: 690,
    y: 228,
    sigma: 110,
    amp: 0.79,
  },
  {
    id: 'c-marine',
    code: 'SEG-04',
    segmentKey: 'marine',
    state: 'needs-review',
    x: 884,
    y: 470,
    sigma: 94,
    amp: 0.56,
  },
  {
    id: 'c-energy',
    code: 'SEG-05',
    segmentKey: 'energy',
    state: 'unresolved',
    x: 1014,
    y: 236,
    sigma: 80,
    amp: 0.43,
  },
  {
    id: 'c-materials',
    code: 'SEG-06',
    segmentKey: 'materials',
    state: 'excluded',
    x: 198,
    y: 556,
    sigma: 86,
    amp: 0.5,
  },
];

/** Contour levels. Higher levels are drawn heavier — depth reads as evidence. */
const LEVELS = [0.1, 0.18, 0.28, 0.4, 0.52, 0.66, 0.8] as const;

/** Single level used to outline each coverage state's territory. */
const ZONE_LEVEL = 0.24;

const STATE_ORDER: readonly CoverageState[] = ['included', 'needs-review', 'unresolved', 'excluded'];

/** The research traverse: signed brief on the left, calibration pack on the right. */
const TRAVERSE: readonly Waypoint[] = [
  { key: 'brief', n: '01', x: 104, y: 634 },
  { key: 'precision', n: '02', x: 300, y: 248 },
  { key: 'automation', n: '03', x: 474, y: 436 },
  { key: 'process', n: '04', x: 690, y: 228 },
  { key: 'marine', n: '05', x: 884, y: 470 },
  { key: 'pack', n: '06', x: 1092, y: 634 },
];

function range(step: number, limit: number): number[] {
  const out: number[] = [];
  for (let v = step; v < limit; v += step) out.push(v);
  return out;
}

let cached: Partial<Record<MapVariant, UniverseScene>> = {};

/**
 * Build (and memoize) the scene. The hero crop is shorter than the full sheet;
 * both share one field so the two maps are visibly the same territory.
 */
export function universeScene(variant: MapVariant = 'full'): UniverseScene {
  const memo = cached[variant];
  if (memo) return memo;

  const width = 1200;
  const height = variant === 'hero' ? 720 : 720;

  const field = buildField(CLUSTERS, {
    width,
    height,
    cols: 150,
    rows: 90,
    seed: SEED,
    noiseAmount: 0.19,
    noiseScale: 3.4,
  });

  const contours = contourSet(field, [...LEVELS], variant === 'hero' ? 1.4 : 1.0);

  const zones = STATE_ORDER.map((state) => {
    const members = CLUSTERS.filter((c) => c.state === state);
    if (members.length === 0) return { state, paths: [] as string[] };
    const stateField = buildField(members, {
      width,
      height,
      cols: 150,
      rows: 90,
      seed: SEED + STATE_ORDER.indexOf(state) + 1,
      noiseAmount: 0.19,
      noiseScale: 3.4,
    });
    const [set] = contourSet(stateField, [ZONE_LEVEL], 1.6);
    return { state, paths: set?.paths ?? [] };
  }).filter((z) => z.paths.length > 0);

  const scene: UniverseScene = {
    width,
    height,
    contours,
    zones,
    clusters: CLUSTERS,
    traverse: toSmoothPath(TRAVERSE, 0.3),
    waypoints: TRAVERSE,
    gridX: range(100, width),
    gridY: range(90, height),
  };

  cached = { ...cached, [variant]: scene };
  return scene;
}

/** Stroke weight for a contour level — deeper terrain, stronger line. */
export function contourWeight(level: number): number {
  return 0.6 + level * 1.5;
}

/** Stroke opacity for a contour level. */
export function contourOpacity(level: number): number {
  return 0.16 + level * 0.5;
}
