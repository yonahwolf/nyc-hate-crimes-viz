import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import type { PropertyCount } from '../types/hateCrimes';

const COLORS = [
  '#6366f1', '#8b5cf6', '#a855f7', '#c084fc',
  '#e879f9', '#f472b6', '#fb7185', '#f97316',
  '#facc15', '#a3e635', '#34d399', '#22d3ee',
  '#38bdf8', '#818cf8', '#fb923c', '#4ade80',
];

interface Props {
  data: PropertyCount[];
  label: string;
}

interface TooltipPayload {
  name: string;
  value: number;
  payload: PropertyCount;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm shadow-lg">
      <p className="text-slate-200 font-medium">{item.name}</p>
      <p className="text-slate-400">{item.value.toLocaleString()} complaints</p>
    </div>
  );
}

export function DonutChart({ data, label }: Props) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 320, height: 320 }}>
        <PieChart width={320} height={320}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={145}
            paddingAngle={2}
            dataKey="count"
            nameKey="name"
            isAnimationActive={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-slate-100">{total.toLocaleString()}</span>
          <span className="text-xs text-slate-400 mt-1">{label}</span>
        </div>
      </div>
    </div>
  );
}
