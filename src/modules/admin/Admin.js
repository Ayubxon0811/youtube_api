const mongoose = require("mongoose");

const type = {
  type: mongoose.SchemaTypes.String,
  required: true,
};

const AdminSchema = new mongoose.Schema(
  {
    first_name: type,
    last_name: type,
    image: type,
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["admin", "super_admin"],
      default: "admin",
    },
    username: {
      ...type,
      unique: true,
    },
    password: type,
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
const Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;
