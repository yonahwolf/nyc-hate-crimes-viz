import { create } from 'zustand';

interface VisualizationState {
  selectedProperty: string;
  setSelectedProperty: (property: string) => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  selectedProperty: 'bias_motive_description',
  setSelectedProperty: (property) => set({ selectedProperty: property }),
}));
