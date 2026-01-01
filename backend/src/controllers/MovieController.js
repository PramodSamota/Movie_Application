import Movie from "../models/movieModel.js";
const getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .populate("addedBy", "username")
      .sort({ rank: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        movies,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalMovies: total,
          moviesPerPage: limit,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSortedMovies = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const validSortFields = ["title", "rating", "releaseDate", "duration"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "rank";
    const sortOrder = order === "desc" ? -1 : 1;

    const movies = await Movie.find()
      .populate("addedBy", "username")
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        movies,
        sortedBy: sortField,
        order: sortOrder === 1 ? "asc" : "desc",
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalMovies: total,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Text search on title and description
    const movies = await Movie.find(
      {
        $text: { $search: query },
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .populate("addedBy", "username")
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments({
      $text: { $search: query },
    });

    res.status(200).json({
      success: true,
      data: {
        movies,
        searchQuery: query,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalResults: total,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// const addMovie = async (req, res) => {
//   try {
//     const movieData = {
//       ...req.body,
//       addedBy: req.user._id,
//     };

//     // Add to queue for lazy insertion
//     const queueJob = await QueueJob.create({
//       type: "movie_insert",
//       data: movieData,
//       status: "pending",
//     });

//     // Process queue in background
//     processQueue();

//     res.status(202).json({
//       success: true,
//       message: "Movie added to processing queue",
//       data: {
//         jobId: queueJob._id,
//         status: "pending",
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedBy: req.user._id,
    };

    const movie = await Movie.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("addedBy updatedBy", "username");

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: { deletedMovieId: id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAllMovies, searchMovies, updateMovie, deleteMovie };
