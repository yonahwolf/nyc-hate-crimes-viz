import { create } from 'zustand';

export type ViewMode = 'distribution' | 'yoy';

interface VisualizationState {
  selectedProperty: string;
  mode: ViewMode;
  setSelectedProperty: (property: string) => void;
  setMode: (mode: ViewMode) => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  selectedProperty: 'bias_motive_description',
  mode: 'distribution',
  setSelectedProperty: (property) => set({ selectedProperty: property }),
  setMode: (mode) => set({ mode }),
}));
