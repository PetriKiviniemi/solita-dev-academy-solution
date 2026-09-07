import { fetchDayDetails } from "~/api/generated";
import { CHEAPEST_HOURS_COUNT } from "~/dayDetails/definitions";
import { toDayDetails } from "~/dayDetails/factories";
import type { TDayDetails } from "~/dayDetails/types";

export const fetchDayDetailsForDate = async (
  date: string,
): Promise<TDayDetails> => {
  const response = await fetchDayDetails({
    path: { date },
    query: { cheapestHours: CHEAPEST_HOURS_COUNT },
    throwOnError: true,
  });

  return toDayDetails(response.data);
};
