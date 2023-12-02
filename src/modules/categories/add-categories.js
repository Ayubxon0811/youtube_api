const Category = require("./cateogires.js");

const add = async ({ body }) => {
  return Category.create(body);
};
module.exports = add;
