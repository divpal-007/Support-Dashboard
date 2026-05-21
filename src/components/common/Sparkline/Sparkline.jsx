export default function Sparkline({ data = [], color = '#6366f1', height = 40, width = 100 }) {
  if (!data.length) return null;
  const H = height, W = width, PAD = 2;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const xs = data.map((_, i) => PAD + (i / (data.length - 1)) * (W - PAD * 2));
  const ys = data.map(v => H - PAD - ((v - min) / range) * (H - PAD * 2));
  const line = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const fill = `${line} L${xs.at(-1).toFixed(1)},${H} L${xs[0].toFixed(1)},${H} Z`;
  const id = `sg-${color.replace('#', '')}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
