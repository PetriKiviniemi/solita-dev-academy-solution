import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

import { controlsRowSx } from "~/common/styles";
import { Box } from "@mui/material";
import {
  DAY_SORT_FIELDS,
  DAY_SORT_FIELD_LABELS,
  SORT_DIRECTIONS,
  SORT_DIRECTION_LABELS,
} from "~/daySummaries/definitions";
import type { TDaySortField, TSortDirection } from "~/daySummaries/types";

type TDaySummarySortControlsProps = {
  sortBy: TDaySortField;
  direction: TSortDirection;
  onSortByChange: (sortBy: TDaySortField) => void;
  onDirectionChange: (direction: TSortDirection) => void;
};

const DaySummarySortControls = (props: TDaySummarySortControlsProps) => {
  const { sortBy, direction, onSortByChange, onDirectionChange } = props;

  const handleSortByChange = (event: SelectChangeEvent) => {
    onSortByChange(event.target.value as TDaySortField);
  };

  const handleDirectionChange = (event: SelectChangeEvent) => {
    onDirectionChange(event.target.value as TSortDirection);
  };

  return (
    <Box sx={controlsRowSx}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select
          labelId="sort-by-label"
          label="Sort by"
          value={sortBy}
          onChange={handleSortByChange}
        >
          {DAY_SORT_FIELDS.map((field) => (
            <MenuItem key={field} value={field}>
              {DAY_SORT_FIELD_LABELS[field]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="direction-label">Direction</InputLabel>
        <Select
          labelId="direction-label"
          label="Direction"
          value={direction}
          onChange={handleDirectionChange}
        >
          {SORT_DIRECTIONS.map((value) => (
            <MenuItem key={value} value={value}>
              {SORT_DIRECTION_LABELS[value]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DaySummarySortControls;
