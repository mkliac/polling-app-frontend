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
import { useNavigate, useSearchParams } from "react-router-dom";
import { PollFilter, PollFitlerType } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  selectSideBar,
  setSideBar,
  toggleSideBar,
} from "../redux/reducers/ConfigSlice";

const MenuBar = () => {
  const theme = useTheme();
  const isExtend = useAppSelector(selectSideBar);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(min-width:750px)");
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelect = (filterType: PollFitlerType) => {
    setSearchParams(
      (prev) => {
        prev.set("filterType", filterType);
        prev.set("search", "");
        return prev;
      },
      { replace: true }
    );
    dispatch(setSideBar(false));
  };
  const list = (
    <List>
      <ListItem
        button
        sx={{
          minHeight: "3rem",
          "&:hover": {
            transition: "0.05s",
          },
        }}
        onClick={() => onSelect(PollFilter.ALL)}
      >
        <ListItemIcon>
          <Window />
        </ListItemIcon>
        <ListItemText primary={isExtend ? "Public" : ""} />
      </ListItem>
      <ListItem
        button
        sx={{
          minHeight: "3rem",
          "&:hover": {
            transition: "0.05s",
          },
        }}
        onClick={() => onSelect(PollFilter.USER)}
      >
        <ListItemIcon>
          <FolderOpen />
        </ListItemIcon>
        <ListItemText primary={isExtend ? "My Polls" : ""} />
      </ListItem>
      <ListItem
        button
        sx={{
          minHeight: "3rem",
          "&:hover": {
            transition: "0.05s",
          },
        }}
        onClick={() => onSelect(PollFilter.BOOKMARKED)}
      >
        <ListItemIcon>
          <Bookmarks />
        </ListItemIcon>
        <ListItemText primary={isExtend ? "Bookmarks" : ""} />
      </ListItem>
      <ListItem
        button
        sx={{
          minHeight: "3rem",
          "&:hover": {
            transition: "0.05s",
          },
        }}
        onClick={() => {
          navigate("/create-poll");
          dispatch(setSideBar(false));
        }}
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
