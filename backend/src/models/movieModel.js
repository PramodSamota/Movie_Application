import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      index: true,
    },
    releaseDate: {
      type: Date,
      required: true,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
      index: true,
    },
    genre: [
      {
        type: String,
        trim: true,
      },
    ],
    director: {
      type: String,
      trim: true,
    },
    cast: [
      {
        type: String,
        trim: true,
      },
    ],
    posterUrl: {
      type: String,
      trim: true,
    },
    imdbId: {
      type: String,
      unique: true,
      sparse: true,
    },
    rank: {
      type: Number,
      min: 1,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

movieSchema.index(
  { title: "text", description: "text" },
  {
    weights: {
      title: 5,
      description: 1,
    },
  }
);
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
