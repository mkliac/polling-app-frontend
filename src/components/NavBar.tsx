import { Menu, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";
import { toggleSideBar } from "../redux/reducers/ConfigSlice";
import CustomAvatar from "./CustomAvatar";
import FlexBetween from "./FlexBwtween";

const NavBar = () => {
  const theme = useTheme();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

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
            Voting
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
          <InputBase placeholder="Search..." fullWidth />
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
