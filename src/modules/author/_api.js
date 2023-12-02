const express = require("express");
const {
  add_auhtor,
  list_author,
  updated_author,
  delete_author,
  find_author_byid,
  undelete_author,
  login_author,
  user_history,
} = require("./_controller");
const multer = require("multer");
const path = require("path");
const { isloggedIn, hasRole } = require("../../shared/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // "uploads" papkasi
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = uniqueSuffix + extension;
    cb(null, filename);
  },
});
const upload = multer({ storage });

let Mallauthors = [isloggedIn, hasRole(["admin", "super_admin", "user"])];
let Mfindbuidauthors = [isloggedIn, hasRole(["user", "admin", "super_admin"])];
let MeditAuthor = [isloggedIn, hasRole(["admin", "user", "super_admin"])];
let MdeleteAuthor = [isloggedIn, hasRole(["admin", "super_admin", "user"])];
let MundeleteAuhtor = [isloggedIn, hasRole(["admin", "super_admin"])];

router.post("/auhtor/register", upload.single("avatar"), add_auhtor);
router.post("/auhtor/login", login_author);
router.get("/auhtor", Mallauthors, list_author);
router.get("/auhtor/:id", Mfindbuidauthors, find_author_byid);
router.put("/auhtor/:id", MeditAuthor, updated_author);
router.delete("/auhtor/:id", MdeleteAuthor, delete_author);
router.delete("/auhtor/un/:id", MundeleteAuhtor, undelete_author);
router.get("/auhtor/history/:id", user_history);

module.exports = router;
