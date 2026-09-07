import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

import { PRICE_UNIT } from "~/common/definitions";
import { formatHourOfDay } from "~/common/formatters";
import { chartCardSx, metricLabelSx } from "~/common/styles";
import type { THour } from "~/dayDetails/types";

type TDayPriceChartProps = {
  hours: THour[];
};

const DayPriceChart = (props: TDayPriceChartProps) => {
  const { hours } = props;

  const labels = hours.map((hour) => formatHourOfDay(hour.startTime));
  const prices = hours.map((hour) => hour.hourlyPrice);
  const knownPrices = prices.filter((price): price is number => price !== null);

  return (
    <Box sx={chartCardSx}>
      <Typography sx={metricLabelSx}>Price per hour ({PRICE_UNIT})</Typography>
      <BarChart
        height={280}
        xAxis={[{ data: labels, scaleType: "band" }]}
        yAxis={[
          {
            min: Math.min(0, ...knownPrices),
            max: Math.max(0, ...knownPrices),
          },
        ]}
        series={[{ data: prices, label: "Price" }]}
        margin={{ top: 24, right: 8, bottom: 24, left: 8 }}
      />
    </Box>
  );
};

export default DayPriceChart;
