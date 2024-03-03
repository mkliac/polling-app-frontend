import { Menu, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/UserModel";
import CustomAvatar from "./CustomAvatar";
import FlexBetween from "./FlexBwtween";
import { toggleSideBar } from "../state";

const NavBar = () => {
  const theme = useTheme();
  const user = useSelector((state: { user: User }) => state.user);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{ width: "100%", backgroundColor: theme.palette.background.paper }}
    >
      <FlexBetween sx={{ padding: "0.1rem 0.5rem" }}>
        <FlexBetween sx={{ gap: "1rem" }}>
          <IconButton onClick={() => dispatch(toggleSideBar())}>
            <Menu />
          </IconButton>
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
          >
            Voting
          </Typography>
        </FlexBetween>
        <FlexBetween
          sx={{
            borderRadius: "1rem",
            minWidth: "20rem",
            padding: "0rem 1rem",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
        <FlexBetween sx={{ gap: "0.5rem" }}>
          <CustomAvatar name={user.username} />
          <Typography variant="h4">{user.username}</Typography>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};

export default NavBar;
