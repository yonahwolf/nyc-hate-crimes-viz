export interface PropertyCount {
  name: string;
  count: number;
}

// One row per year; keys are the distinct values of the selected property
export interface YoYRow {
  year: string;
  [key: string]: string | number;
}

export interface YoYData {
  rows: YoYRow[];
  keys: string[]; // unique property values, ordered by total desc
}
