const userService = require("../service/user.service.js");

class UserController {
  async getUsers(req, res) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }

  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).send({ message: error.message });
      }
      res.status(400).send({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = req.body;
      const createdUser = await userService.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const user = req.body;
      const updatedUser = await userService.updateUser(id, user);
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).send({ message: error.message });
      }
      res.status(400).send({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const deletedUser = await userService.deleteUser(id);
      res.status(200).json(deletedUser);
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).send({ message: error.message });
      }
      res.status(400).send({ error: error.message });
    }
  }
}

module.exports = new UserController();
