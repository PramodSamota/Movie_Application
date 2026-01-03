import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDate, formatDuration } from "../../utils/formatters";

const MovieCard = ({ movie, onEdit, onDelete, showActions = false }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={
          movie.posterUrl || "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Rank Badge */}
        {movie.rank && (
          <Chip
            label={`#${movie.rank}`}
            size="small"
            color="primary"
            sx={{ mb: 1 }}
          />
        )}

        {/* Title */}
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {movie.title}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating
            value={movie.rating / 2}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {movie.rating?.toFixed(1)}/10
          </Typography>
        </Box>

        {/* Info */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatDate(movie.releaseDate)} • {formatDuration(movie.duration)}
        </Typography>

        {/* Genres */}
        {movie.genre && movie.genre.length > 0 && (
          <Box sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {movie.genre.slice(0, 3).map((g, index) => (
              <Chip key={index} label={g} size="small" variant="outlined" />
            ))}
          </Box>
        )}

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          size="small"
          startIcon={<Visibility />}
          onClick={handleViewDetails}
        >
          View Details
        </Button>

        {showActions && (
          <Box>
            <Button
              size="small"
              startIcon={<Edit />}
              onClick={() => onEdit(movie)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<Delete />}
              onClick={() => onDelete(movie)}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;
