import { useInfiniteQuery } from "@tanstack/react-query";

import { DAY_SUMMARIES_QUERY_KEY } from "~/daySummaries/definitions";
import { fetchDaySummariesPage } from "~/daySummaries/queries";
import type { TDaySummariesQuery, TDaySummaryPage } from "~/daySummaries/types";

export const useDaySummaries = (params: TDaySummariesQuery) => {
  const { sortBy, direction } = params;

  const query = useInfiniteQuery({
    queryKey: [DAY_SUMMARIES_QUERY_KEY, sortBy, direction],
    queryFn: ({ pageParam }) =>
      fetchDaySummariesPage({ pageNumber: pageParam, sortBy, direction }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: TDaySummaryPage) =>
      lastPage.pageNumber + 1 < lastPage.totalPages
        ? lastPage.pageNumber + 1
        : undefined,
  });

  return query;
};
