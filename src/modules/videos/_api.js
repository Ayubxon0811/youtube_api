const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  add_video,
  edit_videos,
  delete_video,
  list_video,
  undelete_video,
  like_video,
  find_video,
} = require("./_controller");
const { isloggedIn } = require("../../shared/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      const fileName =
        req.body.title.replace(/\s+/g, "_") +
        "image." +
        file.mimetype.split("/")[1];
      cb(null, fileName);
    } else {
      const fileName =
        req.body.title.replace(/\s+/g, "_") +
        "video." +
        file.mimetype.split("/")[1];
      cb(null, fileName);
    }
  },
});

const multi_upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/ogg" ||
      file.mimetype === "video/wmv" ||
      file.mimetype === "video/x" ||
      file.mimetype === "video/avi" ||
      file.mimetype === "video/webm" ||
      file.mimetype === "video/mkv" ||
      file.mimetype === "video/avchd" ||
      file.mimetype === "video/mov"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error(
        "Only .png, .jpg, .jpeg, and video formats are allowed!"
      );
      err.name = "ExtensionError";
      return cb(err);
    }
  },
});
const cpUpload = multi_upload.fields([
  { name: "video", maxCount: 1 },
  { name: "video_image", maxCount: 1 },
]);
let mLikeVideo = [isloggedIn];
router.post(
  "/video/:id",
  isloggedIn,
  multi_upload.fields([
    { name: "video", maxCount: 1 },
    { name: "video_image", maxCount: 1 },
  ]),
  add_video
);
router.put("/video/:id", edit_videos);
router.delete("/video/:id", delete_video);
router.delete("/video/un/:id", undelete_video);
router.get("/video", list_video);
router.get("/video/like/:videoId", mLikeVideo, like_video);
router.get("/video/:id", isloggedIn, find_video);

module.exports = router;
