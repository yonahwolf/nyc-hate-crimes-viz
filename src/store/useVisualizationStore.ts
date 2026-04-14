import { create } from 'zustand';

export type ViewMode = 'distribution' | 'yoy';

interface VisualizationState {
  selectedProperty: string;
  mode: ViewMode;
  selectedValues: string[];
  setSelectedProperty: (property: string) => void;
  setMode: (mode: ViewMode) => void;
  setSelectedValues: (values: string[]) => void;
  toggleValue: (value: string) => void;
}

export const useVisualizationStore = create<VisualizationState>((set, get) => ({
  selectedProperty: 'bias_motive_description',
  mode: 'distribution',
  selectedValues: [],
  setSelectedProperty: (property) => set({ selectedProperty: property, selectedValues: [] }),
  setMode: (mode) => set({ mode }),
  setSelectedValues: (values) => set({ selectedValues: values }),
  toggleValue: (value) => {
    const current = get().selectedValues;
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    set({ selectedValues: next });
  },
}));
