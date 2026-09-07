import { Box, ListItemButton, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router";

import {
  COMPLETE_DAY_HOURS,
  CONSUMPTION_UNIT,
  PRODUCTION_UNIT,
} from "~/common/definitions";
import { formatAmount, formatDate, formatPrice } from "~/common/formatters";
import {
  incompleteRowSx,
  metricLabelSx,
  metricValueSx,
  summaryRowSx,
} from "~/common/styles";
import type { TDaySummary } from "~/daySummaries/types";

type TDaySummaryRowProps = {
  summary: TDaySummary;
};

type TCellProps = {
  label: string;
  value: string;
};

const Cell = (props: TCellProps) => {
  const { label, value } = props;

  return (
    <Box>
      <Typography sx={metricLabelSx} noWrap>
        {label}
      </Typography>
      <Typography sx={metricValueSx} noWrap>
        {value}
      </Typography>
    </Box>
  );
};

const DaySummaryRow = (props: TDaySummaryRowProps) => {
  const { summary } = props;

  const isIncomplete = summary.hoursWithData < COMPLETE_DAY_HOURS;

  const row = (
    <ListItemButton
      component={Link}
      to={`/day?date=${summary.date}`}
      sx={{
        ...summaryRowSx,
        ...(isIncomplete ? incompleteRowSx : {}),
      }}
    >
      <Box>
        <Typography sx={metricValueSx} noWrap>
          {formatDate(summary.date)}
        </Typography>
        <Typography sx={metricLabelSx} noWrap>
          {summary.hoursWithData} / {COMPLETE_DAY_HOURS} h
        </Typography>
      </Box>
      <Cell
        label={`Consumption (${CONSUMPTION_UNIT})`}
        value={formatAmount(summary.consumptionAmount)}
      />
      <Cell
        label={`Production (${PRODUCTION_UNIT})`}
        value={formatAmount(summary.productionAmount)}
      />
      <Cell label="Avg price" value={formatPrice(summary.averagePrice)} />
      <Cell
        label="Negative streak"
        value={`${summary.longestConsecutiveHoursOfNegativePrice ?? 0} h`}
      />
    </ListItemButton>
  );

  if (!isIncomplete) {
    return row;
  }

  return (
    <Tooltip
      title={`Only ${summary.hoursWithData} of ${COMPLETE_DAY_HOURS} hours were recorded for this day, so its totals are not comparable to a complete day.`}
      placement="top"
      arrow
    >
      <Box sx={{ height: "100%" }}>{row}</Box>
    </Tooltip>
  );
};

export default DaySummaryRow;
