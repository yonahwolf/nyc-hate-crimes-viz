import type { ViewMode } from '../store/useVisualizationStore';
import { useVisualizationStore } from '../store/useVisualizationStore';

const OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'distribution', label: 'Distribution' },
  { value: 'yoy', label: 'Year over Year' },
];

export function ModeToggle() {
  const { mode, setMode } = useVisualizationStore();

  return (
    <div className="flex rounded-lg overflow-hidden border border-slate-600">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setMode(opt.value)}
          className={`px-4 py-1.5 text-sm font-medium transition-colors ${
            mode === opt.value
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
