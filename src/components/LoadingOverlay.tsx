import { Box, CircularProgress, Modal } from "@mui/material";

const LoadingOverlay = ({ isLoading }) => {
  return (
    <Modal open={isLoading}>
      <Box>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    </Modal>
  );
};

export default LoadingOverlay;
