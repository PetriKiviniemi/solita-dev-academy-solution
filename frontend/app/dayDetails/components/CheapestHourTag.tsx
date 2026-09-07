import { Chip } from "@mui/material";

import { formatHourOfDay, formatPrice } from "~/common/formatters";
import type { THour } from "~/dayDetails/types";

type TCheapestHourTagProps = {
  hour: THour | null;
};

const CheapestHourTag = (props: TCheapestHourTagProps) => {
  const { hour } = props;

  if (!hour) {
    return <Chip label="No price recorded for this day" variant="outlined" />;
  }

  return (
    <Chip
      color="success"
      variant="outlined"
      label={`Cheapest hour ${formatHourOfDay(hour.startTime)} at ${formatPrice(hour.hourlyPrice)}`}
    />
  );
};

export default CheapestHourTag;
