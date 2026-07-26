/** Build-time, accessible SVG primitives for the aggregate market page. */

function escape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;');
}

export function barRow(
  label: string,
  value: number,
  max: number,
  suffix = '',
): string {
  const width = Math.max(0, Math.min(100, (value / max) * 100));
  return `<svg class="market-bar" viewBox="0 0 640 54" role="img" aria-label="${escape(
    `${label}: ${value}${suffix}`,
  )}">
    <title>${escape(`${label}: ${value}${suffix}`)}</title>
    <text x="0" y="19">${escape(label)}</text>
    <rect x="210" y="7" width="350" height="18" rx="3" class="market-bar__track"/>
    <rect x="210" y="7" width="${(350 * width) / 100}" height="18" rx="3" class="market-bar__value"/>
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
    <circle cx="${x}" cy="45" r="7"/>
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
      return `${x},${y}`;
    })
    .join(' ');
  return `<svg class="sparkline" viewBox="0 0 220 64" role="img" aria-label="${escape(
    label,
  )}"><title>${escape(label)}</title><polyline points="${points}"/></svg>`;
}
