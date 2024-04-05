import { Alert, AlertColor, Snackbar } from "@mui/material";

const CustomSnackbar = ({
  isTriggered,
  setOpen,
  message,
  serverity,
}: {
  isTriggered: boolean;
  setOpen: (value: boolean) => void;
  message: string;
  serverity?: AlertColor;
}) => {
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
      autoHideDuration={3000}
      onClose={handleCloseError}
    >
      <Alert
        severity={!serverity ? "error" : serverity}
        variant="filled"
        onClose={handleCloseError}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
