import { Box, Typography } from "@mui/material";

import { metricLabelSx, metricValueSx, statCardSx } from "~/common/styles";

type TStatCardProps = {
  label: string;
  value: string;
  caption?: string;
};

const StatCard = (props: TStatCardProps) => {
  const { label, value, caption } = props;

  return (
    <Box sx={statCardSx}>
      <Typography sx={metricLabelSx}>{label}</Typography>
      <Typography variant="h5" sx={metricValueSx}>
        {value}
      </Typography>
      {caption ? (
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      ) : null}
    </Box>
  );
};

export default StatCard;
