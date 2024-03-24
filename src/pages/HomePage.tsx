import { Box, useTheme } from "@mui/material";
import MenuBar from "../components/MenuBar";
import NavBar from "../components/NavBar";
import PollsWidget from "../components/PollsWidget";

const HomePage = () => {
  const theme = useTheme();

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
          padding: "0",
          gap: "0.25rem",
          justifyContent: "center",
        }}
      >
        <Box width="32rem">
          <PollsWidget />
        </Box>
      </Box>
    </Box>
  );
};
export default HomePage;
