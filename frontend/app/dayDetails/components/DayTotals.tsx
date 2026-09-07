import { Box } from "@mui/material";

import StatCard from "~/common/components/StatCard";
import { CONSUMPTION_UNIT, PRODUCTION_UNIT } from "~/common/definitions";
import { formatAmount, formatPrice } from "~/common/formatters";
import { statGridSx } from "~/common/styles";
import type { TDayDetails } from "~/dayDetails/types";

type TDayTotalsProps = {
  details: TDayDetails;
};

const DayTotals = (props: TDayTotalsProps) => {
  const { details } = props;

  return (
    <Box sx={statGridSx}>
      <StatCard
        label={`Total consumption (${CONSUMPTION_UNIT})`}
        value={formatAmount(details.consumptionAmount)}
        caption={
          details.consumptionAmount === null ? "Not measured" : undefined
        }
      />
      <StatCard
        label={`Total production (${PRODUCTION_UNIT})`}
        value={formatAmount(details.productionAmount)}
      />
      <StatCard
        label="Average price"
        value={formatPrice(details.averagePrice)}
      />
    </Box>
  );
};

export default DayTotals;
