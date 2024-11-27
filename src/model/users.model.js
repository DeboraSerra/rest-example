const fs = require("fs/promises");

const parseUsers = async () => {
  const usersFile = await fs.readFile(__dirname, "../db/users.csv", "utf-8");
  const users = [];
  const headers = usersFile.split("\n")[0].split(",");
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
    users.push(user);
    const headers = Object.keys(users[0]);
    await fs.writeFile(
      __dirname,
      "../db/users.csv",
      [...headers, ...users]
        .map((user) => Object.values(user).join(","))
        .join("\n")
    );
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
    users[userIndex] = user;
    const headers = Object.keys(users[0]);
    await fs.writeFile(
      __dirname,
      "../db/users.csv",
      [...headers, ...users]
        .map((user) => Object.values(user).join(","))
        .join("\n")
    );
  }

  async delete(id) {
    const users = await parseUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error("User not found");
    users.splice(userIndex, 1);
    const headers = Object.keys(users[0]);
    await fs.writeFile(
      __dirname,
      "../db/users.csv",
      [...headers, ...users]
        .map((user) => Object.values(user).join(","))
        .join("\n")
    );
  }
}
