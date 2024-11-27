const userModel = require("../model/user.model.js");

class UserService {
  async getUserById(id) {
    if (!id) {
      throw new Error("Id is required");
    }
    if (isNaN(id)) {
      throw new Error("Id must be a number");
    }
    const user = await userModel.findById(id);
    return user;
  }

  async getAllUsers() {
    const users = await userModel.findAll();
    return users;
  }

  async createUser(user) {
    const { name, age, city, country, phone, email } = user;
    if (!user) {
      throw new Error("User is required");
    }
    if (!name) {
      throw new Error("Name is required");
    }
    if (!age) {
      throw new Error("Age is required");
    }
    if (!city) {
      throw new Error("City is required");
    }
    if (!country) {
      throw new Error("Country is required");
    }
    if (!phone) {
      throw new Error("Phone is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    const createdUser = await userModel.create(user);
    return createdUser;
  }

  async updateUser(id, user) {
    if (!id) {
      throw new Error("Id is required");
    }
    if (isNaN(id)) {
      throw new Error("Id must be a number");
    }
    if (!user) {
      throw new Error("User is required");
    }
    const updatedUser = await userModel.update(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    if (!id) {
      throw new Error("Id is required");
    }
    if (isNaN(id)) {
      throw new Error("Id must be a number");
    }
    await userModel.delete(id);
    return { message: "User deleted successfully" };
  }
}

module.exports = new UserService();
