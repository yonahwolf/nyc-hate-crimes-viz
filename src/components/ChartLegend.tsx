import type { PropertyCount } from '../types/hateCrimes';

const COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#c084fc',
  '#e879f9', '#f472b6', '#fb7185', '#f97316',
  '#facc15', '#a3e635', '#34d399', '#22d3ee',
  '#38bdf8', '#818cf8', '#fb923c', '#4ade80',
];

interface Props {
  data: PropertyCount[];
}

export function ChartLegend({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-1">
      {data.map((item, index) => {
        const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : '0';
        return (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span
              className="shrink-0 w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-slate-300 flex-1 truncate" title={item.name}>
              {item.name}
            </span>
            <span className="text-slate-400 shrink-0">{item.count.toLocaleString()}</span>
            <span className="text-slate-500 shrink-0 w-12 text-right">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}
