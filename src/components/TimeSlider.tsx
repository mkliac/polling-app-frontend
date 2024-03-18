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
    <Box padding="0.2rem">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: "0.25rem",
        }}
      >
        <Flag />
        <Slider
          size="small"
          min={0}
          max={1}
          value={percent}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
          sx={{
            color: `rgb(${255 * percent}, ${255 * (1 - percent)}, 0)`,
            margin: "0",
            padding: "0",
            "& .MuiSlider-thumb": {
              height: "0.5rem",
              width: "0.5rem",
            },
          }}
        />
        <SportsScore />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography display="flex" alignItems="center">
          {date1.toLocaleDateString("en-US")}
        </Typography>
        <Typography display="flex" alignItems="center">
          {date2.toLocaleDateString("en-US")}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeSlider;
