const userService = require("../service/user.service.js");
const { statusCodes } = require("../statusCodes.js");

class UserController {
  async getUsers(req, res) {
    const users = await userService.getAllUsers();
    res.status(statusCodes.OK).json({ users });
  }

  async getUser(req, res) {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.status(statusCodes.OK).json({ user });
  }

  async createUser(req, res) {
    const user = req.body;
    const createdUser = await userService.createUser(user);
    res.status(statusCodes.CREATED).json({ user: createdUser });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await userService.updateUser(id, user);
    res.status(statusCodes.OK).json({ user: updatedUser });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(statusCodes.NO_CONTENT);
  }
}

module.exports = new UserController();
