import { useQuery } from "@tanstack/react-query";

import { DAY_DETAILS_QUERY_KEY } from "~/dayDetails/definitions";
import { fetchDayDetailsForDate } from "~/dayDetails/queries";

export const useDayDetails = (date: string | null) => {
  const query = useQuery({
    queryKey: [DAY_DETAILS_QUERY_KEY, date],
    queryFn: () => fetchDayDetailsForDate(date as string),
    enabled: date !== null,
    retry: false,
  });

  return query;
};
