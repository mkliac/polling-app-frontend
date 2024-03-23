import { Menu, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PollFilter } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";
import { toggleSideBar } from "../redux/reducers/ConfigSlice";
import { getPolls } from "../services/PollService";
import CustomAvatar from "./CustomAvatar";
import FlexBetween from "./FlexBwtween";

const NavBar = () => {
  const theme = useTheme();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(min-width:750px)");
  const [searchParams, setSearchParams] = useSearchParams({
    filterType: PollFilter.ALL,
    search: "",
  });
  const [inputSearch, setInputSearch] = useState(searchParams.get("search") || "");

  const onSearch = () => {
    setSearchParams(
      (prev) => {
        prev.set("search", inputSearch);
        return prev;
      },
      { replace: true }
    );
    setInputSearch("");
    const search = searchParams.get("search");
    const filterType = searchParams.get("filterType") as PollFilter;
    dispatch(getPolls({ search, filterType }));
  };

  return (
    <Box
      sx={{ width: "100%", backgroundColor: theme.palette.background.paper }}
    >
      <FlexBetween sx={{ padding: "0.1rem 0.5rem", gap: "1rem" }}>
        <FlexBetween sx={{ gap: "1rem" }}>
          <IconButton onClick={() => dispatch(toggleSideBar())}>
            <Menu />
          </IconButton>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
          >
            {matches ? "Polling" : "P"}
          </Typography>
        </FlexBetween>
        <FlexBetween
          sx={{
            borderRadius: "1rem",
            maxWidth: "25rem",
            width: "100%",
            padding: "0rem 1rem",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <InputBase
            placeholder="Search..."
            fullWidth
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <IconButton onClick={() => onSearch()}>
            <Search />
          </IconButton>
        </FlexBetween>
        <FlexBetween sx={{ gap: "0.5rem" }}>
          <CustomAvatar name={user.username} />
          {matches ? (
            <Typography variant="h4">{user.username}</Typography>
          ) : null}
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default NavBar;
