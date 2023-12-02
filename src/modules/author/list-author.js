const Author = require("./Author");

const ListAuthor = async () => {
  let authorlist = await Author.find({ is_deleted: false });
  return authorlist;
};
module.exports = ListAuthor;
