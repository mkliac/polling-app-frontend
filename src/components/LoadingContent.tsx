import { Box, CircularProgress } from "@mui/material";

const LoadingContent = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingContent;
