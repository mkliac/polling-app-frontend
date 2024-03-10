import { Bookmarks, FolderOpen, Window } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useAppSelector } from "../redux/hook";
import { selectSideBar } from "../redux/reducers/AuthSlice";

const MenuBar = () => {
  const theme = useTheme();
  const isExtend = useAppSelector(selectSideBar);

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

export default MenuBar;
