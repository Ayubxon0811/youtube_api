const { default: mongoose } = require("mongoose");
const { nowDate, NowDateText } = require("../../shared/helper/isNow");
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
const statsSchema = {
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribersText: {
    type: String,
    required: false,
    default: "no subscribers",
  },
  videos: {
    type: Number,
  },
  videosText: {
    type: String,
    required: false,
    default: "no videos",
  },
};
const subscribersSchema = {
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
    required: false,
  },
};
const ChannelSchema = new mongoose.Schema(
  {
    avatar: {
      type: [AvatarSchema],
    },
    canonicalBaseUrl: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    // badges: ,
    username: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    stats: {
      subscribers: {
        type: Number,
        default: 0,
      },
      subscribersText: {
        type: String,
        required: false,
        default: "no subscribers",
      },
      videos: {
        type: Number,
      },
      videosText: {
        type: String,
        required: false,
        default: "no videos",
      },
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    title: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    country: {
      type: mongoose.SchemaTypes.String,
      required: false,
      default: null,
    },
    description: {
      type: mongoose.SchemaTypes.String,
      required: false,
      default: null,
    },
    joinedDate: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    joinedDateText: {
      type: mongoose.SchemaTypes.String,
      required: false,
    },
    // keywords:{
    // }
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Author",
    },
    channel_vidios: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Videos",
        required: false,
      },
    ],
    subscribers: {
      type: [subscribersSchema],
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

ChannelSchema.pre("save", function (next) {
  if (!this.title && this.email.includes("@")) {
    const emailParts = this.email.split("@");
    this.title = emailParts[0];
  }
  if (this.username) {
    this.username = "@" + this.username;
  }
  if (!this.username) {
    this.username = "@" + this.title;
  }

  this.canonicalBaseUrl = "/" + this.username;
  this.joinedDate = nowDate();
  this.joinedDateText = NowDateText();
  this.stats.subscribers = this.subscribers.length;
  function numbertotext(labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? Math.abs(Number(labelValue)) / 1.0e9 + "B"
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? Math.abs(Number(labelValue)) / 1.0e6 + "M"
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
      : Math.abs(Number(labelValue));
  }
  this.stats.subscribersText = numbertotext(this.stats.subscribers);
  next();
});

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;
