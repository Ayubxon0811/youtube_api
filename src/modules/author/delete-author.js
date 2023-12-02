const Author = require("./Author");

const DelteAuthor = async ({ params }) => {
  let exsisted = await Author.findById(params.id);
  if (!exsisted) {
    return res.status(404).json({ message: "Author not found" });
  }
  const removeAuthor = await Author.findByIdAndUpdate(
    { _id: params.id },
    { is_deleted: true },
    { new: true }
  );
  return removeAuthor;
};

module.exports = DelteAuthor;
