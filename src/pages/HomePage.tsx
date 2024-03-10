import { Box, useTheme } from "@mui/material";
import NavBar from "../components/NavBar";
import PollsWidget from "../components/PollsWidget";
import SideBar from "../components/SideBar";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box width="100%" height="100%">
      <Box position="sticky" width="100%" zIndex={1} sx={{ top: "0" }}>
        <NavBar />
      </Box>
      <Box position="fixed" height="100%" zIndex={1}>
        <SideBar />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          padding: "0.2rem 6%",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        <Box maxWidth="32rem">
          <PollsWidget />
        </Box>
      </Box>
    </Box>
  );
};
export default HomePage;
