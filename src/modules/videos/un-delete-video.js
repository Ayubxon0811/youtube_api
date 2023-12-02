const { NotFoundError } = require("../../shared/errors");
const Videos = require("./Videos.schema");

const UndeleteVideo = async ({ params }) => {
  let exists = await Videos.findOne({ is_deleted: true, _id: params.id });
  if (!exists) {
    throw new NotFoundError("not found Video");
  }
  let undelete_user = await Videos.findByIdAndUpdate(
    params.id,
    {
      is_deleted: false,
    },
    { new: true }
  );
  return undelete_user;
};
module.exports = UndeleteVideo;
