const mongoose = require("mongoose");
const { nowDate, nowdataclock } = require("../../shared/helper/isNow");

let viewed_users = [
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Author",
      default: null,
    },
    viewedAt: {
      type: String,
      default: nowdataclock(),
    },
  },
];
const statsSchema = {
  comments: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
};

const videosSchema = new mongoose.Schema({
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
    required: false,
  },
  category_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category",
    // required: true,
  },
  publishedDate: {
    type: mongoose.SchemaTypes.String,
  },
  description: {
    type: String,
    required: false,
  },
  endScreen: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  isLiveContent: {
    type: Boolean,
    default: false,
  },
  isLiveNow: {
    type: Boolean,
    default: false,
  },
  keywords: [String],
  lengthSeconds: String,
  publishedDate: String,
  stats: statsSchema,
  superTitle: [String],
  video_path: mongoose.SchemaTypes.String,
  video_image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  video_comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comments",
    },
  ],
  liked_users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Author",
      default: 0,
    },
  ],
  viewed_users: viewed_users,
  video_channel: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Channel",
  },
  is_deleted: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
});

videosSchema.pre("save", function (next) {
  this.publishedDate = nowDate();
  this.stats.views = this.viewed_users.length;
  next();
});

const Videos = mongoose.model("Videos", videosSchema);
module.exports = Videos;
