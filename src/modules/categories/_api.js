const { isloggedIn } = require("../../shared/auth");
const isMongoId = require("../../shared/validator/isMongoId");
let express = require("express");
let router = express.Router();
const {
  addCategory,
  editCategory,
  listCategory,
  removeCategory,
  unremoveCategory,
} = require("./_controller.js");
const isLoggedIn = require("../../shared/auth/isLoggedIn");

const mAddCategory = [isLoggedIn];
const mRemoveCategory = [isLoggedIn, isMongoId];
const mUnRemoveCategory = [isLoggedIn, isMongoId];
const mEditCategory = [isLoggedIn, isMongoId];

router.post("/category", mAddCategory, addCategory);
router.get("/category", listCategory);
router.delete("/category/:id", mRemoveCategory, removeCategory);
router.delete("/category/un/:id", mUnRemoveCategory, unremoveCategory);
router.patch("/category/:id", mEditCategory, editCategory);

module.exports = router;
