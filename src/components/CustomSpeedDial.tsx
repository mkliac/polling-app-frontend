import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";

export interface CustomSpeedDialActionModel {
  icon: ReactNode;
  name: string;
  onClick: () => void;
}

const CustomSpeedDial = ({
  actions,
}: {
  actions: CustomSpeedDialActionModel[];
}) => {
  const matches = useMediaQuery("(min-width:650px)");
  const theme = useTheme();

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "absolute",
        bottom: "3rem",
        right: matches ? "3rem" : "50%",
        transform: matches ? "none" : "translateX(50%)",
      }}
      icon={<SpeedDialIcon />}
      FabProps={{
        sx: {
          bgcolor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          "&:hover": {
            bgcolor: theme.palette.grey[300],
          },
        },
      }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default CustomSpeedDial;
