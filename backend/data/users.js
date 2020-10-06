const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admim@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    address: "xxxxxxxxxxxx",
  },
  {
    name: "John Doe",
    email: "test@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    address: "xxxxxxxxxxxx",
  },
  {
    name: "Jane Doe",
    email: "test123@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    address: "xxxxxxxxxxxx",
  },
];

module.exports = users;
