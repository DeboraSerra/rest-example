const userService = require("../service/user.service.js");

class UserController {
  async getUsers(req, res) {
    const users = await userService.getAllUsers();
    res.status(201).json({ users });
  }

  async getUser(req, res) {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.status(200).json({ user });
  }

  async createUser(req, res) {
    const user = req.body;
    const createdUser = await userService.createUser(user);
    res.status(201).json({ user: createdUser });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await userService.updateUser(id, user);
    res.status(200).json({ user: updatedUser });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(204);
  }
}

module.exports = new UserController();
