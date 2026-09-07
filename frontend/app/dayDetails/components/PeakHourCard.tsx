import StatCard from "~/common/components/StatCard";
import { PRODUCTION_UNIT } from "~/common/definitions";
import {
  EMPTY_VALUE,
  formatHourOfDay,
  formatWithUnit,
} from "~/common/formatters";
import { kilowattHoursToMegawattHours } from "~/dayDetails/operations";
import type { THour } from "~/dayDetails/types";

type TPeakHourCardProps = {
  hour: THour | null;
};

const PeakHourCard = (props: TPeakHourCardProps) => {
  const { hour } = props;

  if (!hour) {
    return (
      <StatCard
        label="Highest consumption vs production"
        value={EMPTY_VALUE}
        caption="No hour of this day has both measurements"
      />
    );
  }

  const consumedMegawattHours = formatWithUnit(
    kilowattHoursToMegawattHours(hour.consumptionAmount),
    PRODUCTION_UNIT,
  );
  const producedMegawattHours = formatWithUnit(
    hour.productionAmount,
    PRODUCTION_UNIT,
  );

  return (
    <StatCard
      label="Highest consumption vs production"
      value={formatHourOfDay(hour.startTime)}
      caption={`${consumedMegawattHours} consumed against ${producedMegawattHours} produced`}
    />
  );
};

export default PeakHourCard;
