import { Alert, Snackbar } from "@mui/material";

export default function CustomSnackbar({
  isOpen,
  setIsOpen,
  severity = "error",
  message = "Something went wrong!",
}) {
  const closeSnackbar = (event, reason) => {
    setIsOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={isOpen}
      onClose={closeSnackbar}
      key="bottom-center"
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
