import { KWH_PER_MWH } from "~/common/definitions";

export const kilowattHoursToMegawattHours = (
  value: number | null,
): number | null => (value === null ? null : value / KWH_PER_MWH);
