const { BadRequestError } = require("../../shared/errors");
const Channel = require("./channel.schema");

const UpdateUsers = async ({ body, params }) => {
  const exsited = await Channel.findById(params.id);
  if (!exsited) {
    throw new BadRequestError("Channel not found");
  }
  const updated = await Channel.findByIdAndUpdate(
    { _id: params.id },
    { ...body },
    { new: true }
  );
  return updated;
};
module.exports = UpdateUsers;
