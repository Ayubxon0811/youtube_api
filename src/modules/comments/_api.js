const express = require("express");
const {
  all_comments,
  create_video,
  delete_comment,
  find_comment,
  reply_comments,
} = require("./_controller");
const { isloggedIn } = require("../../shared/auth");

let Mcreate_comment = [isloggedIn];
let Mreply_comments = [isloggedIn];

let router = express.Router();
router.get("/comments", all_comments);
router.post("/comments/add/:id", Mcreate_comment, create_video);
router.delete("/comments/:id", delete_comment);
router.get("/comments/:id", find_comment);
router.post("/comments/reply/:id", Mreply_comments, reply_comments);

module.exports = router;
