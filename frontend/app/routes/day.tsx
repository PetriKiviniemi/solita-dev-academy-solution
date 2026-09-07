import { useSearchParams } from "react-router";

import DayDetailsView from "~/dayDetails/views/DayDetailsView";

export default function DayPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const date = searchParams.get("date");

  const handleDateChange = (nextDate: string) => {
    setSearchParams({ date: nextDate });
  };

  return <DayDetailsView date={date} onDateChange={handleDateChange} />;
}
