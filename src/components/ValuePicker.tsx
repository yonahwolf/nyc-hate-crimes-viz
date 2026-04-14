import { useVisualizationStore } from '../store/useVisualizationStore';

interface Props {
  allValues: string[];
}

export function ValuePicker({ allValues }: Props) {
  const { selectedValues, toggleValue, setSelectedValues } = useVisualizationStore();

  const allSelected = selectedValues.length === allValues.length;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Compare values
        </span>
        <button
          onClick={() => setSelectedValues(allSelected ? [] : allValues)}
          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {allValues.map((value) => {
          const active = selectedValues.includes(value);
          return (
            <button
              key={value}
              onClick={() => toggleValue(value)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                active
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500'
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
