const mongoose = require("mongoose");
const { nowdataclock } = require("../../shared/helper/isNow");

const type = {
  type: mongoose.SchemaTypes.String,
  required: true,
};
const AvatarSchema = {
  height: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 0,
  },
};
let viewed_videos = [
  {
    video: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Videos",
      default: null,
    },
    viewedAt: {
      type: String,
      default: nowdataclock(),
    },
  },
];

const statsSchema = new mongoose.Schema({
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribersText: {
    type: String,
    required: false,
    default: "no subscribers",
  },
});

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const AuthorSchema = new mongoose.Schema(
  {
    avatar: {
      type: [AvatarSchema],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    role: {
      type: mongoose.SchemaTypes.String,
      default: "user",
    },
    password: {
      ...type,
      required: true,
    },
    canonicalBaseUrl: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    channelId: {
      type: mongoose.ObjectId,
      ref: "Channel",
      required: false,
    },
    stats: {
      type: statsSchema,
      required: false,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    title: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    viewed_videos,
    subscribered_channel: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Channel",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

AuthorSchema.pre("save", function (next) {
  if (!this.title && this.email.includes("@")) {
    const emailParts = this.email.split("@");
    this.title = emailParts[0];
  }
  this.canonicalBaseUrl = "/@" + this.title;
  next();
});

const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
