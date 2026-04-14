import { PROPERTY_OPTIONS } from '../constants/properties';
import { useVisualizationStore } from '../store/useVisualizationStore';

export function PropertySelector() {
  const { selectedProperty, setSelectedProperty } = useVisualizationStore();

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="property-select" className="text-slate-400 text-sm font-medium">
        Visualize by
      </label>
      <select
        id="property-select"
        value={selectedProperty}
        onChange={(e) => setSelectedProperty(e.target.value)}
        className="bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      >
        {PROPERTY_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
