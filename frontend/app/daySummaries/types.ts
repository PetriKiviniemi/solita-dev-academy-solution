import type {
  DAY_SORT_FIELDS,
  SORT_DIRECTIONS,
} from "~/daySummaries/definitions";

export type TDaySortField = (typeof DAY_SORT_FIELDS)[number];

export type TSortDirection = (typeof SORT_DIRECTIONS)[number];

export type TDaySummary = {
  date: string;
  productionAmount: number | null;
  consumptionAmount: number | null;
  averagePrice: number | null;
  longestConsecutiveHoursOfNegativePrice: number | null;
  hoursWithData: number;
};

export type TDaySummaryPage = {
  summaries: TDaySummary[];
  pageNumber: number;
  totalPages: number;
  totalElements: number;
};

export type TDaySummariesQuery = {
  sortBy: TDaySortField;
  direction: TSortDirection;
};
