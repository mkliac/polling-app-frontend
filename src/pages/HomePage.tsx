import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Fab, useTheme } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import PollsWidget from "../components/PollsWidget";
import UserInfoWidget from "../components/UserInfoWidget";
import { PollFilter } from "../models/PollModels";
import { useAppSelector } from "../redux/hook";
import { selectUser } from "../redux/reducers/AuthSlice";

const HomePage = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchUserId = searchParams.get("userId");
  const filterType = searchParams.get("filterType");
  const systemUserId = useAppSelector(selectUser).email;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box width="100%" height="100%">
      <Box position="sticky" width="100%" zIndex={1} sx={{ top: "0" }}>
        <NavBar />
      </Box>
      <Box position="fixed" height="100%" zIndex={1}>
        <MenuBar />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          padding: "0",
          gap: "5%",
          justifyContent: "center",
        }}
      >
        {(filterType === PollFilter.MY_POLLS ||
          filterType === PollFilter.USER) && (
          <Box width="32rem">
            <UserInfoWidget
              userId={
                filterType === PollFilter.MY_POLLS ? systemUserId : searchUserId
              }
            />
          </Box>
        )}
        <Box width="32rem">
          <PollsWidget />
        </Box>
      </Box>
      <Fab
        size="small"
        sx={{
          position: "fixed",
          bottom: "3%",
          right: "3%",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          "&:hover": {
            bgcolor: theme.palette.grey[300],
          },
        }}
        onClick={scrollToTop}
      >
        <KeyboardArrowUp />
      </Fab>
    </Box>
  );
};
export default HomePage;
