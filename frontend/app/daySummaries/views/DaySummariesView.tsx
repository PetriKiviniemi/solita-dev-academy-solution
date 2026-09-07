import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useMemo, useState } from "react";

import { centeredStateSx, pageHeaderSx, pageSx } from "~/common/styles";
import DaySummarySortControls from "~/daySummaries/components/DaySummarySortControls";
import VirtualisedDaySummaryList from "~/daySummaries/components/VirtualisedDaySummaryList";
import { useDaySummaries } from "~/daySummaries/hooks";
import type { TDaySortField, TSortDirection } from "~/daySummaries/types";

const DaySummariesView = () => {
  const [sortBy, setSortBy] = useState<TDaySortField>("DATE");
  const [direction, setDirection] = useState<TSortDirection>("DESC");

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useDaySummaries({ sortBy, direction });

  const summaries = useMemo(
    () => data?.pages.flatMap((page) => page.summaries) ?? [],
    [data],
  );

  const totalElements = data?.pages[0]?.totalElements ?? 0;

  return (
    <Box sx={pageSx}>
      <Box sx={pageHeaderSx}>
        <Box>
          <Typography variant="h4">Daily statistics</Typography>
          <Typography variant="body2" color="text.secondary">
            {totalElements > 0
              ? `${totalElements} recorded days`
              : "Electricity consumption, production and price per day"}
          </Typography>
        </Box>
        <DaySummarySortControls
          sortBy={sortBy}
          direction={direction}
          onSortByChange={setSortBy}
          onDirectionChange={setDirection}
        />
      </Box>

      {isPending ? (
        <Box sx={centeredStateSx}>
          <CircularProgress />
          <Typography variant="body2">Loading daily statistics…</Typography>
        </Box>
      ) : null}

      {isError ? (
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : "Could not load daily statistics."}
        </Alert>
      ) : null}

      {!isPending && !isError ? (
        <VirtualisedDaySummaryList
          summaries={summaries}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onLoadMore={fetchNextPage}
        />
      ) : null}
    </Box>
  );
};

export default DaySummariesView;
