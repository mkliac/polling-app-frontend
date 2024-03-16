import { Alert, Snackbar } from "@mui/material";

const ErrorSnackbar = ({ isTriggered, onClose, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isTriggered}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert severity="error" variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
