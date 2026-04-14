import type { PropertyCount } from '../types/hateCrimes';

const BASE = 'https://data.cityofnewyork.us/resource/bqiq-cu78.json';

export async function fetchPropertyCounts(property: string): Promise<PropertyCount[]> {
  const params = new URLSearchParams({
    $select: `${property},count(*) as count`,
    $group: property,
    $order: 'count DESC',
    $limit: '100',
  });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data: Record<string, string>[] = await res.json();
  return data.map((row) => ({
    name: row[property] ?? '(unknown)',
    count: Number(row.count),
  }));
}
