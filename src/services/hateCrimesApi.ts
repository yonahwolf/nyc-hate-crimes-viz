import type { PropertyCount, YoYData, YoYRow } from '../types/hateCrimes';

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

export async function fetchYearOverYear(property: string): Promise<YoYData> {
  const params = new URLSearchParams({
    $select: `complaint_year_number,${property},count(*) as count`,
    $group: `complaint_year_number,${property}`,
    $order: 'complaint_year_number ASC',
    $limit: '2000',
  });
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const raw: Record<string, string>[] = await res.json();

  // Collect all unique years and values
  const yearSet = new Set<string>();
  const totals: Record<string, number> = {};

  for (const row of raw) {
    yearSet.add(row.complaint_year_number ?? '(unknown)');
    const val = row[property] ?? '(unknown)';
    totals[val] = (totals[val] ?? 0) + Number(row.count);
  }

  const years = [...yearSet].sort();
  // Order keys by total descending so the dominant category sits at the bottom of each bar
  const keys = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  // Build one row per year
  const rowMap: Record<string, YoYRow> = {};
  for (const year of years) rowMap[year] = { year };

  for (const row of raw) {
    const year = row.complaint_year_number ?? '(unknown)';
    const val = row[property] ?? '(unknown)';
    rowMap[year][val] = Number(row.count);
  }

  return { rows: years.map((y) => rowMap[y]), keys };
}
