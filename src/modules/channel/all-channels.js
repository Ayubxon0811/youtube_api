const { NotFoundError } = require("../../shared/errors");
const Channel = require("./channel.schema");

const AllChannels = async () => {
  let chanels = await Channel.find({ is_deleted: false }).populate([
    {
      path: "author",
    },
    {
      path: "channel_vidios",
    },
  ]);
  if (!chanels) {
    throw new NotFoundError("not found channels :-( ");
  }
  return chanels;
};
module.exports = AllChannels;
