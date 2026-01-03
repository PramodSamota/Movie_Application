import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Movie as MovieIcon } from "@mui/icons-material";

const EmptyState = ({
  message = "No movies found",
  description = "Try adjusting your search or filters",
  action,
  actionLabel = "Clear Filters",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        textAlign: "center",
        py: 8,
      }}
    >
      <MovieIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        {message}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {description}
      </Typography>
      {action && (
        <Button variant="contained" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
