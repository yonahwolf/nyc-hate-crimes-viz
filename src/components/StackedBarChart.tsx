import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { YoYData } from '../types/hateCrimes';

// Fixed color per year — stable across property changes
const YEAR_COLORS: Record<string, string> = {
  '2019': '#6366f1',
  '2020': '#a855f7',
  '2021': '#ec4899',
  '2022': '#f97316',
  '2023': '#eab308',
  '2024': '#22c55e',
  '2025': '#06b6d4',
};
const FALLBACK_COLORS = ['#818cf8', '#c084fc', '#fb7185', '#fb923c', '#a3e635', '#34d399'];
function yearColor(year: string, index: number) {
  return YEAR_COLORS[year] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

// Pivot: rows indexed by selected value, columns = years
function pivotData(yoyData: YoYData, selectedValues: string[]) {
  const years = yoyData.rows.map((r) => r.year as string);
  const rows = selectedValues.map((val) => {
    const row: Record<string, string | number> = { name: val };
    for (const yearRow of yoyData.rows) {
      row[yearRow.year as string] = (yearRow[val] as number) ?? 0;
    }
    return row;
  });
  return { rows, years };
}

// Truncate long X-axis labels
function CustomXTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const label = payload?.value ?? '';
  const maxLen = 14;
  const display = label.length > maxLen ? label.slice(0, maxLen) + '…' : label;
  return (
    <g transform={`translate(${x},${y})`}>
      <title>{label}</title>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={12}
      >
        {display}
      </text>
    </g>
  );
}

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
    <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm shadow-lg max-w-[220px]">
      <p className="text-slate-200 font-semibold mb-1 text-xs leading-tight">{label}</p>
      <p className="text-slate-400 mb-2 text-xs">Total: {total.toLocaleString()}</p>
      {[...payload].reverse().map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: p.fill }} />
          <span className="text-slate-300 flex-1">{p.dataKey}</span>
          <span className="text-slate-400 shrink-0">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

interface Props {
  data: YoYData;
  selectedValues: string[];
}

export function StackedBarChart({ data, selectedValues }: Props) {
  const { rows, years } = pivotData(data, selectedValues);

  if (selectedValues.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
        Select one or more values above to compare them.
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 32 }}>
          <XAxis
            dataKey="name"
            tick={<CustomXTick />}
            axisLine={{ stroke: '#334155' }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          {years.map((year, index) => (
            <Bar
              key={year}
              dataKey={year}
              stackId="a"
              fill={yearColor(year, index)}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      {/* Year legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
        {years.map((year, index) => (
          <div key={year} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: yearColor(year, index) }}
            />
            <span className="text-slate-400">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
