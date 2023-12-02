const { NotFoundError } = require("../../shared/errors");
const { nowdataclock } = require("../../shared/helper/isNow");
const Author = require("../author/Author");
const Videos = require("./Videos.schema");

const FindByVideo = async ({ params, user }) => {
  const video = await Videos.findById(params.id).populate([
    {
      path: "author",
    },
    {
      path: "video_comments",
    },
    {
      path: "video_channel",
    },
    {
      path: "viewed_users.user",
    },
  ]);
  if (!video) {
    throw new NotFoundError("video not found");
  }

  const viewedUser = { user: user.id };
  const isUserExist = video.viewed_users.find((e) => {
    if (e.user?._id.toString() == user.id) {
      return e;
    }
  });
  if (isUserExist) {
    isUserExist.viewedAt = nowdataclock();
    await isUserExist.save();
  }
  if (!isUserExist) {
    video.viewed_users.push(viewedUser);
    await video.save();
  }

  let findAuthor = await Author.findById(user.id);
  let isUserExistInAuthor = findAuthor.viewed_videos.find(
    (j) => j.video?.toString() == params.id
  );
  if (!isUserExistInAuthor) {
    findAuthor.viewed_videos.push({ video: params.id });
    await findAuthor.save();
  }
  return video;
};

module.exports = FindByVideo;
