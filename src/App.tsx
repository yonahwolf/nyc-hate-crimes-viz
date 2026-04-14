import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropertySelector } from './components/PropertySelector';
import { ModeToggle } from './components/ModeToggle';
import { DonutChart } from './components/DonutChart';
import { ChartLegend } from './components/ChartLegend';
import { StackedBarChart } from './components/StackedBarChart';
import { usePropertyCounts } from './hooks/usePropertyCounts';
import { useYearOverYear } from './hooks/useYearOverYear';
import { useVisualizationStore } from './store/useVisualizationStore';
import { PROPERTY_OPTIONS } from './constants/properties';

const queryClient = new QueryClient();

function Dashboard() {
  const { selectedProperty, mode } = useVisualizationStore();
  const label = PROPERTY_OPTIONS.find((o) => o.key === selectedProperty)?.label ?? selectedProperty;

  const distribution = usePropertyCounts(selectedProperty);
  const yoy = useYearOverYear(selectedProperty);

  const isLoading = mode === 'distribution' ? distribution.isLoading : yoy.isLoading;
  const isError = mode === 'distribution' ? distribution.isError : yoy.isError;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-1">NYC Hate Crimes</h1>
        <p className="text-slate-400 text-sm mb-8">
          Source: NYC Open Data &mdash;{' '}
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
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-4 justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-200">
              {mode === 'distribution' ? 'Complaints by' : 'Year over Year —'} {label}
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <ModeToggle />
              <PropertySelector />
            </div>
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

          {mode === 'distribution' && distribution.data && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="shrink-0">
                <DonutChart data={distribution.data} label="total" />
              </div>
              <div className="flex-1 w-full">
                <ChartLegend data={distribution.data} />
              </div>
            </div>
          )}

          {mode === 'yoy' && yoy.data && (
            <StackedBarChart data={yoy.data} />
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
