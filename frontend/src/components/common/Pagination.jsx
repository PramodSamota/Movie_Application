import React from "react";
import { Box, Pagination as MuiPagination, Typography } from "@mui/material";

const Pagination = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages, totalMovies } = pagination;

  if (totalPages <= 1) return null;

  const handleChange = (event, page) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        mt: 4,
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing page {currentPage} of {totalPages} ({totalMovies} total movies)
      </Typography>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
