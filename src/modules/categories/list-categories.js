const Category = require("./cateogires");

const list = async () => {
  return Category.find({ is_deleted: false });
};
module.exports = list;
