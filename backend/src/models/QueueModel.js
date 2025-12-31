import mongoose from "mongoose";

const queueJobSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["movie_insert", "movie_update", "movie_delete"],
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
      index: true,
    },
    retries: {
      type: Number,
      default: 0,
      max: 3,
    },
    error: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400,
    },
  },
  { timestamps: true }
);

const QueueJob = mongoose.model("QueueJob", queueJobSchema);

export default QueueJob;
