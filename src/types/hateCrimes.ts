export interface PropertyCount {
  name: string;
  count: number;
}

// One row per year; keys are the distinct values of the selected property
export type YoYRow = { year: string } & Record<string, number>;

export interface YoYData {
  rows: YoYRow[];
  keys: string[]; // unique property values, ordered by total desc
}
