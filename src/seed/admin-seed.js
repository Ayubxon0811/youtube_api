const { hashSync } = require("bcryptjs");

const admins = [
  {
    first_name: "ayubxon",
    last_name: "rahimov",
    image: "Jhon_Doe.png",
    role: "super_admin",
    username: "ayubxon",
    password: hashSync("12345678", 10),
    // "is_deleted":false
  },
  {
    first_name: "sherozbek",
    last_name: "Baxtiyorov",
    image: "sherozbek.png",
    role: "super_admin",
    username: "sherozbek.17",
    password: hashSync("12345678", 10),
    // "is_deleted":false
  },
  {
    first_name: "Husan",
    last_name: "Orif",
    image: "husan.png",
    role: "super_admin",
    username: "husan",
    password: hashSync("12345678", 10),
    // "is_deleted":false
  },
  {
    first_name: "admin1",
    last_name: "admin1",
    image: "admin1.png",
    role: "admin",
    username: "admin1",
    password: hashSync("12345678", 10),
    // "is_deleted":false
  },
  {
    first_name: "admin2",
    last_name: "super_.)",
    image: "admin2.png",
    role: "admin",
    username: "admin2",
    password: hashSync("12345678", 10),
    // "is_deleted":false
  },
  {
    first_name: "asadbek",
    last_name: "bilmadim",
    image: "asadbek.png",
    role: "admin",
    username: "asadbek",
    password: hashSync("12345678", 10),
    // "is_deleted":false
  },
  {
    first_name: "user",
    last_name: "last_user",
    image: "user.png",
    role: "admin",
    username: "user",
    password: hashSync("12345678", 10),
    // "is_deleted":false
  },
];

module.exports = admins;
