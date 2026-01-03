import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";

const ErrorMessage = ({
  error,
  onClose,
  severity = "error",
  title = "Error",
}) => {
  if (!error) return null;

  return (
    <Box sx={{ mb: 2 }}>
      <Alert severity={severity} onClose={onClose}>
        <AlertTitle>{title}</AlertTitle>
        {error}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
