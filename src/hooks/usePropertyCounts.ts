import { useQuery } from '@tanstack/react-query';
import { fetchPropertyCounts } from '../services/hateCrimesApi';

export function usePropertyCounts(property: string) {
  return useQuery({
    queryKey: ['propertyCounts', property],
    queryFn: () => fetchPropertyCounts(property),
    staleTime: 5 * 60 * 1000,
  });
}
