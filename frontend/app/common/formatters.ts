import { PRICE_UNIT } from "~/common/definitions";

const amountFormatter = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 0,
});

const priceFormatter = new Intl.NumberFormat("en-GB", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});

export const EMPTY_VALUE = "—";

export const formatAmount = (value: number | null): string =>
  value === null ? EMPTY_VALUE : amountFormatter.format(value);

export const formatPrice = (value: number | null): string =>
  value === null ? EMPTY_VALUE : `${priceFormatter.format(value)} ${PRICE_UNIT}`;

export const formatWithUnit = (value: number | null, unit: string): string =>
  value === null ? EMPTY_VALUE : `${amountFormatter.format(value)} ${unit}`;

export const formatHours = (value: number | null): string =>
  value === null ? EMPTY_VALUE : `${value} h`;

export const formatDate = (isoDate: string): string =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatHourOfDay = (isoDateTime: string): string =>
  isoDateTime.slice(11, 16);
