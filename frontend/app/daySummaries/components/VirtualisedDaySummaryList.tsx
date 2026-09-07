import { Box, CircularProgress, List } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useState } from "react";

import {
  listScrollSx,
  loaderRowSx,
  virtualListSx,
  virtualRowSx,
} from "~/common/styles";
import DaySummaryRow from "~/daySummaries/components/DaySummaryRow";
import { SUMMARY_ROW_HEIGHT } from "~/daySummaries/definitions";
import type { TDaySummary } from "~/daySummaries/types";

type TVirtualisedDaySummaryListProps = {
  summaries: TDaySummary[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
};

const VirtualisedDaySummaryList = (props: TVirtualisedDaySummaryListProps) => {
  const { summaries, hasNextPage, isFetchingNextPage, onLoadMore } = props;

  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null,
  );

  const virtualizer = useVirtualizer({
    count: summaries.length,
    getScrollElement: () => scrollElement,
    estimateSize: () => SUMMARY_ROW_HEIGHT,
    overscan: 8,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const lastVisibleIndex = virtualItems.at(-1)?.index ?? 0;

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    if (lastVisibleIndex >= summaries.length - 5) {
      onLoadMore();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    lastVisibleIndex,
    summaries.length,
    onLoadMore,
  ]);

  return (
    <Box ref={setScrollElement} sx={listScrollSx}>
      <List
        disablePadding
        sx={virtualListSx}
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualItems.map((virtualRow) => (
          <Box
            key={summaries[virtualRow.index].date}
            sx={virtualRowSx}
            style={{
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <DaySummaryRow summary={summaries[virtualRow.index]} />
          </Box>
        ))}
      </List>

      {isFetchingNextPage ? (
        <Box sx={loaderRowSx}>
          <CircularProgress size={22} />
        </Box>
      ) : null}
    </Box>
  );
};

export default VirtualisedDaySummaryList;
