export type THour = {
  startTime: string;
  productionAmount: number | null;
  consumptionAmount: number | null;
  hourlyPrice: number | null;
};

export type TDayDetails = {
  date: string;
  productionAmount: number | null;
  consumptionAmount: number | null;
  averagePrice: number | null;
  hoursWithData: number;
  peakConsumptionToProductionHour: THour | null;
  cheapestHour: THour | null;
  hours: THour[];
};
