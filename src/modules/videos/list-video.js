const { NotFoundError } = require("../../shared/errors");
const Videos = require("./Videos.schema");
const ListAdmin = async ({ query }) => {
  if (!query.search_query) {
    let all_videos = await Videos.find().populate([
      {
        path: "author",
      },
      {
        path: "video_comments",
        populate: "author",
      },
      {
        path: "video_channel",
      },
    ]);
    return all_videos;
  }

  let exists = await Videos.find({ title: query.search_query }).populate([
    {
      path: "author",
    },
    {
      path: "video_comments",
    },
    {
      path: "video_channel",
    },
  ]);
  if (!exists) {
    throw new NotFoundError("not found video");
  }
  return exists;
};
module.exports = ListAdmin;
