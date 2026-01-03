import React from "react";
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onEdit, onDelete, showActions = false }) => {
  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard
            movie={movie}
            onEdit={onEdit}
            onDelete={onDelete}
            showActions={showActions}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
