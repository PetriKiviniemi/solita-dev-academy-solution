import { fetchDaySummaries } from "~/api/generated";
import { DAY_SUMMARIES_PAGE_SIZE } from "~/daySummaries/definitions";
import { toDaySummaryPage } from "~/daySummaries/factories";
import type { TDaySummariesQuery, TDaySummaryPage } from "~/daySummaries/types";

type TFetchDaySummariesPageParams = TDaySummariesQuery & {
  pageNumber: number;
};

export const fetchDaySummariesPage = async (
  params: TFetchDaySummariesPageParams,
): Promise<TDaySummaryPage> => {
  const { pageNumber, sortBy, direction } = params;

  const response = await fetchDaySummaries({
    query: {
      page: pageNumber,
      size: DAY_SUMMARIES_PAGE_SIZE,
      sortBy,
      direction,
    },
    throwOnError: true,
  });

  return toDaySummaryPage(response.data);
};
