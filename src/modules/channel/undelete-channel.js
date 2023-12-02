const { BadRequestError } = require("../../shared/errors");
const Channel = require("./channel.schema");

const UnDeleteChanel = async ({ params }) => {
  let find_id_channel = await Channel.findOne({
    _id: params.id,
    is_deleted: true,
  });
  if (!find_id_channel) {
    throw new BadRequestError("not found channel :( ");
  }
  let result = await Channel.findByIdAndUpdate(
    { _id: params.id },
    { is_deleted: false }
  );
  return result;
};
module.exports = UnDeleteChanel;
