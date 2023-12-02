const VideoCreate = require("./add-videos");
const DeleteVideo = require("./delete_video");
const EditVideo = require("./edit-video");
const FindByVideo = require("./find-video");
const LikeVideo = require("./like-video");
const ListAdmin = require("./list-video");
const UndeleteVideo = require("./un-delete-video");

const add_video = async (req, res, next) => {
  try {
    let result = await VideoCreate({
      body: req.body,
      file: req.file,
      files: req.files,
      params: req.params,
      user: req.user,
    });
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};
const edit_videos = async (req, res, next) => {
  try {
    let result = await EditVideo({ params: req.params, body: req.body });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const delete_video = async (req, res, next) => {
  try {
    let result = await DeleteVideo({ params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const undelete_video = async (req, res, next) => {
  try {
    let result = await UndeleteVideo({ params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const list_video = async (req, res, next) => {
  try {
    let result = await ListAdmin({ query: req.query });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const like_video = async (req, res, next) => {
  try {
    let result = await LikeVideo({ user: req.user, params: req.params });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const find_video = async (req, res, next) => {
  try {
    let result = await FindByVideo({ params: req.params, user: req.user });
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add_video,
  edit_videos,
  delete_video,
  list_video,
  undelete_video,
  like_video,
  find_video,
};
