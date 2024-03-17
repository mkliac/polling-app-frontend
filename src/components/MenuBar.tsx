import { AddBox, Bookmarks, FolderOpen, Window } from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectSideBar, toggleSideBar } from "../redux/reducers/ConfigSlice";

const MenuBar = () => {
  const theme = useTheme();
  const isExtend = useAppSelector(selectSideBar);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(min-width:800px)");
  const list = (
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
      <ListItem
        button
        sx={{ minHeight: "3rem" }}
        onClick={() => navigate("/create-poll")}
      >
        <ListItemIcon>
          <AddBox />
        </ListItemIcon>
        <ListItemText primary={isExtend ? "Create Poll" : ""} />
      </ListItem>
    </List>
  );

  return (
    <>
      <Drawer open={isExtend} onClose={() => dispatch(toggleSideBar())}>
        <Box
          sx={{
            width: "15rem",
          }}
        >
          {list}
        </Box>
      </Drawer>
      <Box
        sx={{
          width: "3.5rem",
          backgroundColor: theme.palette.background.paper,
          height: "100%",
          display: !matches || isExtend ? "none" : "default",
        }}
      >
        {list}
      </Box>
    </>
  );
};

export default MenuBar;
