import { useQuery } from '@tanstack/react-query';
import { fetchYearOverYear } from '../services/hateCrimesApi';

export function useYearOverYear(property: string) {
  return useQuery({
    queryKey: ['yoy', property],
    queryFn: () => fetchYearOverYear(property),
    staleTime: 5 * 60 * 1000,
  });
}
