const { NotFoundError, BadRequestError } = require("../../shared/errors");
const Author = require("../author/Author");
const Channel = require("./channel.schema");

const subscribe_channel = async ({ params, user }) => {
  let findUser = await Author.findById(user.id);
  let channel = await Channel.findById({ _id: params.id });
  if (!channel) {
    throw new NotFoundError("Channel not found");
  }
  const isSubscribed = channel.subscribers.some(
    (subscriber) => subscriber._id.toString() == user.id
  );
  if (isSubscribed) {
    channel.subscribers = channel.subscribers.filter(
      (subscriber) => subscriber._id.toString() != user.id
    );
    findUser.subscribered_channel = findUser.subscribered_channel.filter(
      (s) => s.toString() != params.id
    );
    console.log(findUser.subscribered_channel);
    await channel.save();
    await findUser.save();
    return "Foydalanuvchi kanaldan chiqdi";
  }
  findUser.subscribered_channel.push(channel._id);
  channel.subscribers.push(user.id);
  await findUser.save();
  await channel.save();
  return "Foydalanuvchi muvaffaqiyatli kanalga obuna bo'ldi.";
};

module.exports = subscribe_channel;
