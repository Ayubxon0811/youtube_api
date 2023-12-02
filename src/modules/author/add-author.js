const { hashSync } = require("bcryptjs");
const Author = require("./Author");
const sharp = require("sharp");
const path = require("path");
const config = require("../../shared/config");
const { BadRequestError } = require("../../shared/errors");
const jwt = require("jsonwebtoken");
const AddAuthor = async ({ body, file }) => {
  let { email, password, subscribers, ...data } = body;
  const existed = await Author.findOne({ email });
  if (existed) {
    throw new BadRequestError("This email already existed!");
  }
  let filename = email.split("@")[0];

  let avatar = [];
  function small_image(file) {
    sharp(file.path)
      .resize({ width: 48, height: 48 })
      .toFile(
        path.join(
          "uploads",
          "small_" + filename + path.extname(file.originalname)
        )
      );
    const smallImageUrl =
      "/uploads/small_" + filename + path.extname(file.originalname);

    // MongoDB-ga saqlash
    avatar.push({
      height: 48,
      url: smallImageUrl,
      width: 48,
    });
  }
  small_image(file);
  function medium_image(file) {
    sharp(file.path)
      .resize({ width: 88, height: 88 })
      .toFile(
        path.join(
          "uploads",
          "medium_" + filename + path.extname(file.originalname)
        )
      );
    const mediumImageUrl =
      "/uploads/medium_" + filename + path.extname(file.originalname);

    // MongoDB-ga saqlash
    avatar.push({
      height: 88,
      url: mediumImageUrl,
      width: 88,
    });
  }
  medium_image(file);
  function large_image(file) {
    sharp(file.path)
      .resize({ width: 176, height: 176 })
      .toFile(
        path.join(
          "uploads",
          "large_" + filename + path.extname(file.originalname)
        )
      );
    const largeImageUrl =
      "/uploads/large_" + filename + path.extname(file.originalname);

    // MongoDB-ga saqlash
    avatar.push({
      height: 176,
      url: largeImageUrl,
      width: 176,
    });
  }
  large_image(file);
  let hashedPassword = hashSync(password, 10);
  let Atuhor_create = await Author.create({
    avatar,
    email,
    password: hashedPassword,
    ...data,
  });
  let decode = {
    id: Atuhor_create.id,
    role: Atuhor_create.role,
  };

  const token = jwt.sign({ user: decode }, config.jwt.secret);

  return token;
};
module.exports = AddAuthor;
