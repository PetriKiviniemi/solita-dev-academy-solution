import type {
  ApiDaySummaryDto,
  PagedModelApiDaySummaryDto,
} from "~/api/generated";
import type { TDaySummary, TDaySummaryPage } from "~/daySummaries/types";

const toNullableNumber = (value: number | undefined): number | null =>
  value === undefined ? null : value;

export const toDaySummary = (dto: ApiDaySummaryDto): TDaySummary => ({
  date: dto.date ?? "",
  productionAmount: toNullableNumber(dto.productionAmount),
  consumptionAmount: toNullableNumber(dto.consumptionAmount),
  averagePrice: toNullableNumber(dto.averagePrice),
  longestConsecutiveHoursOfNegativePrice: toNullableNumber(
    dto.longestConsecutiveHoursOfNegativePrice,
  ),
  hoursWithData: dto.hoursWithData ?? 0,
});

export const toDaySummaryPage = (
  dto: PagedModelApiDaySummaryDto,
): TDaySummaryPage => ({
  summaries: (dto.content ?? []).map(toDaySummary),
  pageNumber: dto.page?.number ?? 0,
  totalPages: dto.page?.totalPages ?? 0,
  totalElements: dto.page?.totalElements ?? 0,
});
