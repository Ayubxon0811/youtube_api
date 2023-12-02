const { NotFoundError } = require("../../shared/errors/index.js");
const Category = require("./cateogires.js");

const edit = async ({ params, body }) => {
  const existing = await Category.findOne({
    _id: params.id,
    is_deleted: false,
  });
  if (!existing) {
    throw new NotFoundError("Category Not Found!");
  }

  return Category.findByIdAndUpdate(params.id, { ...body }, { new: true });
};
module.exports = edit;
