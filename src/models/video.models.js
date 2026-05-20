import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videofile: {
      type: String, //url form thr cloudnriy
      required: true,
    },
    thumbnail: {
      type: String, //url form thr cloudnriy
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String, //url form thr cloudnriy
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, //url form thr cloudnriy
      required: true,
    },
    views: {
      type: Number, //url form thr cloudnriy
      default: 0,
    },
    ispublished: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true },
);

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema);
