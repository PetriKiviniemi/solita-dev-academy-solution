export const DAY_SORT_FIELDS = [
  "DATE",
  "CONSUMPTION_AMOUNT",
  "PRODUCTION_AMOUNT",
  "AVERAGE_PRICE",
  "LONGEST_NEGATIVE_PRICE_STREAK",
  "HOURS_WITH_DATA",
] as const;

export const SORT_DIRECTIONS = ["DESC", "ASC"] as const;

export const DAY_SORT_FIELD_LABELS: Record<
  (typeof DAY_SORT_FIELDS)[number],
  string
> = {
  DATE: "Date",
  CONSUMPTION_AMOUNT: "Consumption",
  PRODUCTION_AMOUNT: "Production",
  AVERAGE_PRICE: "Average price",
  LONGEST_NEGATIVE_PRICE_STREAK: "Negative price streak",
  HOURS_WITH_DATA: "Recorded hours",
};

export const SORT_DIRECTION_LABELS: Record<
  (typeof SORT_DIRECTIONS)[number],
  string
> = {
  DESC: "Descending",
  ASC: "Ascending",
};

export const DAY_SUMMARIES_PAGE_SIZE = 30;
export const DAY_SUMMARIES_QUERY_KEY = "daySummaries";
export const SUMMARY_ROW_HEIGHT = 72;
export const SUMMARY_ROW_MIN_WIDTH = 780;
