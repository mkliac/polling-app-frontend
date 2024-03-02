import { Box, Typography } from "@mui/material";
import { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const HomePage = () => {
  const [isSideBarExtend, setIsSideBarExtend] = useState(true);

  return (
    <Box width="100%" height="100%">
      <Box position="fixed" width="100%" height="100%">
        <NavBar
          isSideBarExtend={isSideBarExtend}
          setIsSideBarExtend={setIsSideBarExtend}
        />
        <SideBar isExtend={isSideBarExtend} />
      </Box>
      <Box>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
        <Typography variant="h1">Home Page</Typography>
      </Box>
    </Box>
  );
};
export default HomePage;
