const { BadRequestError } = require("../../shared/errors");
const Videos = require("./Videos.schema");

const LikeVideo = async ({ user, params }) => {
  const video = await Videos.findById(params.videoId);
  if (!video) {
    throw new BadRequestError("video not found");
  }
  if (!user.id) {
    throw new BadRequestError("liked id is requred");
  }
  const likedUser = video.stats.liked_users.includes(user.id);
  if (likedUser) {
    video.stats.likes -= 1;
    video.stats.liked_users = video.stats.liked_users.filter(
      (id) => !id.equals(user.id)
    );
    await video.save();
    return "un liked video";
  } else {
    video.stats.likes += 1;
    video.stats.liked_users.push(user.id);
    await video.save();
    return "liked video";
  }
};

module.exports = LikeVideo;
