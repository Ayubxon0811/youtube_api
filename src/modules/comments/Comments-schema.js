const mongoose = require("mongoose");
let pinnedschema = {
  status: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  text: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },
};
let statsschema = {
  likes: {
    type: mongoose.SchemaTypes.Number,
    default: 0,
  },
  reply_comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comments",
      default: null,
    },
  ],
};
let publishedTimeText = {
  type: mongoose.SchemaTypes.String,
  default: function () {
    const currentDate = new Date();
    const commentDate = this._id.getTimestamp();

    const diffTime = Math.abs(currentDate - commentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "bugun";
    } else if (diffDays === 1) {
      return "1 kun";
    } else if (diffDays >= 365) {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears} yil`;
    } else {
      return `${diffDays} kun`;
    }
  },
};

let CommentsSchema = new mongoose.Schema({
  stats: statsschema,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
  },
  content: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  pinned: pinnedschema,
  publishedTimeText,
  liked_users: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
  },
  comment_videos: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Videos",
  },
});

const Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;
