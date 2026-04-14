import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropertySelector } from './components/PropertySelector';
import { DonutChart } from './components/DonutChart';
import { ChartLegend } from './components/ChartLegend';
import { usePropertyCounts } from './hooks/usePropertyCounts';
import { useVisualizationStore } from './store/useVisualizationStore';
import { PROPERTY_OPTIONS } from './constants/properties';

const queryClient = new QueryClient();

function Dashboard() {
  const { selectedProperty } = useVisualizationStore();
  const { data, isLoading, isError } = usePropertyCounts(selectedProperty);
  const label = PROPERTY_OPTIONS.find((o) => o.key === selectedProperty)?.label ?? selectedProperty;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-1">NYC Hate Crimes</h1>
        <p className="text-slate-400 text-sm mb-8">
          Source: NYC Open Data &mdash; {' '}
          <a
            href="https://data.cityofnewyork.us/resource/bqiq-cu78.json"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:underline"
          >
            bqiq-cu78
          </a>
        </p>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-200">Complaints by {label}</h2>
            <PropertySelector />
          </div>

          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {isError && (
            <div className="flex items-center justify-center h-64 text-red-400">
              Failed to load data. Please try again.
            </div>
          )}

          {data && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="shrink-0">
                <DonutChart data={data} label="total" />
              </div>
              <div className="flex-1 w-full">
                <ChartLegend data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
