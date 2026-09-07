import { Alert, Box, CircularProgress, Stack, Typography } from "@mui/material";

import { COMPLETE_DAY_HOURS } from "~/common/definitions";
import { formatDate } from "~/common/formatters";
import {
  centeredStateSx,
  dayHeaderRowSx,
  dayLayoutSx,
  pageSx,
} from "~/common/styles";
import CheapestHourTag from "~/dayDetails/components/CheapestHourTag";
import DayDatePicker from "~/dayDetails/components/DayDatePicker";
import DayPriceChart from "~/dayDetails/components/DayPriceChart";
import DayTotals from "~/dayDetails/components/DayTotals";
import PeakHourCard from "~/dayDetails/components/PeakHourCard";
import { useDayDetails } from "~/dayDetails/hooks";

type TDayDetailsViewProps = {
  date: string | null;
  onDateChange: (date: string) => void;
};

const DayDetailsView = (props: TDayDetailsViewProps) => {
  const { date, onDateChange } = props;

  const { data: details, isPending, isError } = useDayDetails(date);

  return (
    <Box sx={pageSx}>
      <Typography variant="h4" gutterBottom>
        Single day
      </Typography>

      <Box sx={dayLayoutSx}>
        <DayDatePicker date={date} onDateChange={onDateChange} />

        <Box>
          {date === null ? (
            <Box sx={centeredStateSx}>
              <Typography>Pick a date to see its statistics.</Typography>
            </Box>
          ) : null}

          {date !== null && isPending ? (
            <Box sx={centeredStateSx}>
              <CircularProgress />
            </Box>
          ) : null}

          {date !== null && isError ? (
            <Alert severity="info">
              No electricity data was recorded for {formatDate(date)}.
            </Alert>
          ) : null}

          {details ? (
            <Stack spacing={2}>
              <Box sx={dayHeaderRowSx}>
                <Typography variant="h6">
                  {formatDate(details.date)}
                </Typography>
                <CheapestHourTag hour={details.cheapestHour} />
                {details.hoursWithData < COMPLETE_DAY_HOURS ? (
                  <Typography variant="body2" color="text.secondary">
                    Only {details.hoursWithData} of {COMPLETE_DAY_HOURS} hours
                    recorded
                  </Typography>
                ) : null}
              </Box>

              <DayTotals details={details} />
              <PeakHourCard hour={details.peakConsumptionToProductionHour} />
              <DayPriceChart hours={details.hours} />
            </Stack>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default DayDetailsView;
