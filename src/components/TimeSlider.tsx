import { Flag, SportsScore } from "@mui/icons-material";
import { Box, Slider, Typography } from "@mui/material";

const TimeSlider = ({ date1, date2 }: { date1: Date; date2: Date }) => {
  const today = new Date();
  const startDate = date1.getTime();
  const endDate = date2.getTime();
  const total = endDate - startDate;
  const progress = today.getTime() - startDate;
  const percent = progress / total;

  return (
    <Box margin="0 1rem">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography display="flex" alignItems="center">
          <Flag />
          {date1.toLocaleDateString("en-US")}
        </Typography>
        <Typography display="flex" alignItems="center">
          <SportsScore />
          {date2.toLocaleDateString("en-US")}
        </Typography>
      </Box>
      <Slider
        size="small"
        min={0}
        max={1}
        value={percent}
        valueLabelDisplay="auto"
        valueLabelFormat={() => today.toLocaleDateString("en-US")}
        sx={{ color: `rgb(${255 * percent}, ${255 * (1 - percent)}, 0)` }}
      />
    </Box>
  );
};

export default TimeSlider;
