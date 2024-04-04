import { Logout, Menu as MenuIcon, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PollFilter } from "../models/PollModels";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser, setLogout } from "../redux/reducers/AuthSlice";
import { toggleSideBar } from "../redux/reducers/ConfigSlice";
import CustomAvatar from "./CustomAvatar";
import FlexBetween from "./FlexBwtween";

const NavBar = () => {
  const theme = useTheme();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(min-width:750px)");
  const [searchParams, setSearchParams] = useSearchParams({
    filterType: PollFilter.PUBLIC,
    search: "",
  });
  const [inputSearch, setInputSearch] = useState(
    searchParams.get("search") || ""
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAnchorClick = Boolean(anchorEl);

  const onSearch = () => {
    setSearchParams(
      (prev) => {
        prev.set("search", inputSearch);
        return prev;
      },
      { replace: true }
    );
    setInputSearch("");
  };

  const logout = () => {
    dispatch(setLogout());
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{ width: "100%", backgroundColor: theme.palette.background.paper }}
    >
      <FlexBetween sx={{ padding: "0.1rem 0.5rem", gap: "1rem" }}>
        <FlexBetween sx={{ gap: "1rem" }}>
          <IconButton onClick={() => dispatch(toggleSideBar())}>
            <MenuIcon />
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
          <Box>
            <IconButton onClick={handleOptionClick}>
              <CustomAvatar src={user.picture} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={isAnchorClick}
              onClose={handleOptionClose}
              disableScrollLock={true}
            >
              <MenuItem
                onClick={() => {
                  handleOptionClose();
                  logout();
                }}
              >
                <Logout />
                Logout
              </MenuItem>
            </Menu>
          </Box>
          {matches ? (
            <Typography variant="h4">{user.username}</Typography>
          ) : null}
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default NavBar;
