const Author = require("./Author");

const FindByAuthors = async ({ params }) => {
  let findbyAuthors = await Author.findById(params.id).populate([
    {
      path: "subscribered_channel",
    },
    {
      path: "viewed_videos",
    },
  ]);
  if (!findbyAuthors) {
    throw new Error("Author not found");
  }
  return findbyAuthors;
};
module.exports = FindByAuthors;
