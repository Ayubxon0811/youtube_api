const { NotFoundError, ForbiddenError } = require("../../shared/errors");
const { compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");
const Author = require("./Author");

const LoginAuhtor = async ({ body }) => {
  const { email, password } = body;

  const existing = await Author.findOne({ email, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Author Not Found");
  }

  const is_correct = compareSync(password, existing.password);

  if (!is_correct) {
    throw new ForbiddenError("Password Incorrect!");
  }

  let decode = {
    id: existing.id,
    role: existing.role,
  };

  const token = jwt.sign({ user: decode }, config.jwt.secret, {
    expiresIn: config.jwt.expirec_in,
  });

  return token;
};

module.exports = LoginAuhtor;
