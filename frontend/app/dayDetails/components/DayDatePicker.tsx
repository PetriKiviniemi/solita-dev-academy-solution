import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { type Dayjs } from "dayjs";

import { FIRST_RECORDED_DATE, LAST_RECORDED_DATE } from "~/common/definitions";
import { surfaceSx } from "~/common/styles";

type TDayDatePickerProps = {
  date: string | null;
  onDateChange: (date: string) => void;
};

const DayDatePicker = (props: TDayDatePickerProps) => {
  const { date, onDateChange } = props;

  const handleChange = (value: Dayjs | null) => {
    if (value) {
      onDateChange(value.format("YYYY-MM-DD"));
    }
  };

  return (
    <Box sx={surfaceSx}>
      <DateCalendar
        value={date ? dayjs(date) : null}
        onChange={handleChange}
        minDate={dayjs(FIRST_RECORDED_DATE)}
        maxDate={dayjs(LAST_RECORDED_DATE)}
      />
    </Box>
  );
};

export default DayDatePicker;
