import { AccessAlarm } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const ExpireAlarm = ({ date1, date2 }: { date1: Date; date2: Date }) => {
  const today = new Date();
  const startDate = date1.getTime();
  const endDate = date2.getTime();
  const total = endDate - startDate;
  const progress = today.getTime() - startDate;
  const percent = progress / total;

  return (
    <Tooltip
      title={percent > 1 ? "Expired" : "Expires at " + date2.toLocaleString()}
    >
      <IconButton
        color={percent > 1 ? "error" : percent > 0.8 ? "warning" : "default"}
      >
        <AccessAlarm />
      </IconButton>
    </Tooltip>
  );
};

export default ExpireAlarm;
