export interface PropertyOption {
  key: string;
  label: string;
}

export const PROPERTY_OPTIONS: PropertyOption[] = [
  { key: 'bias_motive_description', label: 'Bias Motive' },
  { key: 'offense_category', label: 'Offense Category' },
  { key: 'county', label: 'County' },
  { key: 'patrol_borough_name', label: 'Patrol Borough' },
  { key: 'law_code_category_description', label: 'Law Category' },
  { key: 'offense_description', label: 'Offense' },
  { key: 'complaint_year_number', label: 'Year' },
  { key: 'month_number', label: 'Month' },
];
