const { NotFoundError } = require("../../shared/errors");
const Category = require("./cateogires.js");

const removecategory = async ({ params }) => {
  const existing = await Category.findOne({
    _id: params.id,
    is_deleted: false,
  });
  if (!existing) {
    throw new NotFoundError("Category Not Found!");
  }

  return Category.findByIdAndUpdate(
    params.id,
    { is_deleted: true },
    { new: true }
  );
};
module.exports = removecategory;
