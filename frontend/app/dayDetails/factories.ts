import type { ApiDayDetailsDto, ApiHourDto } from "~/api/generated";
import type { TDayDetails, THour } from "~/dayDetails/types";

const toNullableNumber = (value: number | undefined): number | null =>
  value === undefined ? null : value;

export const toHour = (dto: ApiHourDto): THour => ({
  startTime: dto.startTime ?? "",
  productionAmount: toNullableNumber(dto.productionAmount),
  consumptionAmount: toNullableNumber(dto.consumptionAmount),
  hourlyPrice: toNullableNumber(dto.hourlyPrice),
});

export const toDayDetails = (dto: ApiDayDetailsDto): TDayDetails => ({
  date: dto.date ?? "",
  productionAmount: toNullableNumber(dto.productionAmount),
  consumptionAmount: toNullableNumber(dto.consumptionAmount),
  averagePrice: toNullableNumber(dto.averagePrice),
  hoursWithData: dto.hoursWithData ?? 0,
  peakConsumptionToProductionHour: dto.peakConsumptionToProductionHour
    ? toHour(dto.peakConsumptionToProductionHour)
    : null,
  cheapestHour: dto.cheapestHours?.length ? toHour(dto.cheapestHours[0]) : null,
  hours: (dto.hours ?? []).map(toHour),
});
