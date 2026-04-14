import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import type { YoYData, YoYRow } from '../types/hateCrimes';

const COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#c084fc',
  '#e879f9', '#f472b6', '#fb7185', '#f97316',
  '#facc15', '#a3e635', '#34d399', '#22d3ee',
  '#38bdf8', '#818cf8', '#fb923c', '#4ade80',
];

interface TooltipPayload {
  dataKey: string;
  value: number;
  fill: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + (p.value ?? 0), 0);
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm shadow-lg max-w-xs">
      <p className="text-slate-200 font-semibold mb-1">{label}</p>
      <p className="text-slate-400 mb-2">Total: {total.toLocaleString()}</p>
      {[...payload].reverse().map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: p.fill }} />
          <span className="text-slate-300 truncate flex-1">{p.dataKey}</span>
          <span className="text-slate-400 shrink-0">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

interface Props {
  data: YoYData;
}

export function StackedBarChart({ data }: Props) {
  const { rows, keys } = data;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
          <XAxis
            dataKey="year"
            tick={{ fill: '#94a3b8', fontSize: 13 }}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={COLORS[index % COLORS.length]}
              isAnimationActive={false}
            >
              {rows.map((_: YoYRow, rowIndex: number) => (
                <Cell key={rowIndex} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 max-h-40 overflow-y-auto">
        {keys.map((key, index) => (
          <div key={key} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-slate-400 truncate max-w-[160px]" title={key}>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
