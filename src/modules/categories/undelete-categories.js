const { NotFoundError } = require("../../shared/errors");
const Category = require("./cateogires");

const unremove = async ({ params }) => {
  const existing = await Category.findOne({
    _id: params.id,
    is_deleted: true,
  });
  if (!existing) {
    throw new NotFoundError("Category Not Found!");
  }

  return Category.findByIdAndUpdate(
    params.id,
    { is_deleted: false },
    { new: true }
  );
};
module.exports = unremove;
