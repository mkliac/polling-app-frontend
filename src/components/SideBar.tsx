import { Bookmarks, FolderOpen, Window } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

const SideBar = () => {
  const theme = useTheme();
  const isExtend = useSelector(
    (state: { isSideBarExtend: boolean }) => state.isSideBarExtend
  );

  return (
    <Box
      sx={{
        width: isExtend ? "15rem" : "3.5rem",
        height: "100%",
        flexShrink: 0,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <List>
        <ListItem button sx={{ minHeight: "3rem" }}>
          <ListItemIcon>
            <Window />
          </ListItemIcon>
          <ListItemText primary={isExtend ? "Public" : ""} />
        </ListItem>
        <ListItem button sx={{ minHeight: "3rem" }}>
          <ListItemIcon>
            <FolderOpen />
          </ListItemIcon>
          <ListItemText primary={isExtend ? "My Polls" : ""} />
        </ListItem>
        <ListItem button sx={{ minHeight: "3rem" }}>
          <ListItemIcon>
            <Bookmarks />
          </ListItemIcon>
          <ListItemText primary={isExtend ? "Bookmarks" : ""} />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideBar;
