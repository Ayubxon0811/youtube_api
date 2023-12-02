const Channel = require("../../modules/channel/channel.schema");
const { ObjectId } = require("mongoose").Types;

const checkSubscription = async ({ params, user }) => {
  const channel = await Channel.findOne({ _id: params.id });
  const status = channel.subscribers.some((subscriber) =>
    subscriber._id.equals(new ObjectId(user.id))
  );
  return { status };
};

module.exports = checkSubscription;
