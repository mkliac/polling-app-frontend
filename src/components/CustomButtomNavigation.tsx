import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { ReactNode } from "react";

export interface CustomButtomNavigationActionModel {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

const CustomButtomNavigation = ({
  actions,
}: {
  actions: CustomButtomNavigationActionModel[];
}) => {
  return (
    <BottomNavigation
      showLabels
      sx={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      {actions.map((action) => (
        <BottomNavigationAction
          key={action.label}
          label={action.label}
          icon={action.icon}
          onClick={action.onClick}
        />
      ))}
    </BottomNavigation>
  );
};

export default CustomButtomNavigation;
