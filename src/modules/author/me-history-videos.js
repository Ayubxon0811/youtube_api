const Author = require("./Author");

const historyVideos = async ({ params }) => {
  let findAuhtor = await Author.findById(params.id).populate(
    "viewed_videos.video"
  );
  if (!findAuhtor) {
    throw new BadRequestError("not found User");
  }
  return findAuhtor;
};
module.exports = historyVideos;
