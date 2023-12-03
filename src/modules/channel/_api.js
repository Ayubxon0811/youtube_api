const { isloggedIn, hasRole } = require("../../shared/auth");
const isMongoId = require("../../shared/validator/isMongoId");
const {
  create_chanel,
  all_channels,
  edit_chanels,
  delete_chanels,
  subscribe_channels,
  find_id_channel,
  undelete_chanels,
} = require("./_contrller");
let express = require("express");
let router = express.Router();

let Msubscribe = [isloggedIn, isMongoId];
let Mfindidchanel = [isloggedIn, isMongoId];

router.post("/channel", create_chanel);
router.get("/channel", all_channels);
router.get("/channel/:id", Mfindidchanel, find_id_channel);
router.put("/channel/:id", isloggedIn, edit_chanels);
router.delete("/channel/:id", isloggedIn, delete_chanels);
router.delete("/channel/un/:id", isloggedIn, undelete_chanels);
router.get("/channel/subscribe/:id", Msubscribe, subscribe_channels);

module.exports = router;
