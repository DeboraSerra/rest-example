const fs = require("fs/promises");
const path = require("path");

let headers;

const parseUsers = async () => {
  const usersFile = await fs.readFile(
    path.join(__dirname, "../db/users.csv"),
    "utf-8"
  );
  const users = [];
  headers = usersFile.split("\n")[0].split(",");
  usersFile.split("\n").forEach((user, i) => {
    if (i === 0) return;
    const userObj = {};
    user.split(",").forEach((value, j) => {
      userObj[headers[j]] = value;
    });
    users.push(userObj);
  });
  return users;
};

class UsersModel {
  async create(user) {
    const users = await parseUsers();
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
    await fs.writeFile(
      path.join(__dirname, "../db/users.csv"),
      users
        .map((user, i) => {
          if (i === 0) {
            const headers = Object.keys(user).join(",");
            const info = Object.values(user).join(",");
            return `${headers}\n${info}`;
          }
          const orderedUser = {}
          headers.forEach(header => {
            orderedUser[header] = user[header]
          })
          return Object.values(orderedUser).join(",");
        })
        .join("\n")
    );
    return newUser;
  }

  async findById(id) {
    const users = await parseUsers();
    return users.find((user) => user.id === id);
  }

  async findAll() {
    return parseUsers();
  }

  async update(id, user) {
    const users = await parseUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error("User not found");
    const newUser = { ...users[userIndex], ...user };
    users[userIndex] = newUser;
    await fs.writeFile(
      path.join(__dirname, "../db/users.csv"),
      users
        .map((user, i) => {
          if (i === 0) {
            const headers = Object.keys(user).join(",");
            const info = Object.values(user).join(",");
            return `${headers}\n${info}`;
          }
          const orderedUser = {}
          headers.forEach(header => {
            orderedUser[header] = user[header]
          })
          return Object.values(orderedUser).join(",");
        })
        .join("\n")
    );
    return newUser;
  }

  async delete(id) {
    const users = await parseUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error("User not found");
    users.splice(userIndex, 1);
    await fs.writeFile(
      path.join(__dirname, "../db/users.csv"),
      users
        .map((user, i) => {
          if (i === 0) {
            const headers = Object.keys(user).join(",");
            const info = Object.values(user).join(",");
            return `${headers}\n${info}`;
          }
          const orderedUser = {}
          headers.forEach(header => {
            orderedUser[header] = user[header]
          })
          return Object.values(orderedUser).join(",");
        })
        .join("\n")
    );
    return true;
  }
}

module.exports = new UsersModel();