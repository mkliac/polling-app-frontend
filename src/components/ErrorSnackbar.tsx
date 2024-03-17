import { Alert, Snackbar } from "@mui/material";

const ErrorSnackbar = ({ isTriggered, setOpen, message }) => {
  const handleCloseError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isTriggered}
      autoHideDuration={6000}
      onClose={handleCloseError}
    >
      <Alert severity="error" variant="filled" onClose={handleCloseError}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
