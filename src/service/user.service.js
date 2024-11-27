const CodeError = require("../helpers/error.helper.js");
const userModel = require("../model/user.model.js");

class UserService {
  async getUserById(id) {
    if (!id) {
      throw new CodeError("Id is required", 400);
    }
    if (isNaN(id)) {
      throw new CodeError("Id must be a number", 400);
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
      throw new CodeError("User is required", 400);
    }
    if (!name) {
      throw new CodeError("Name is required", 400);
    }
    if (!age) {
      throw new CodeError("Age is required", 400);
    }
    if (!city) {
      throw new CodeError("City is required", 400);
    }
    if (!country) {
      throw new CodeError("Country is required", 400);
    }
    if (!phone) {
      throw new CodeError("Phone is required", 400);
    }
    if (!email) {
      throw new CodeError("Email is required", 400);
    }
    const createdUser = await userModel.create(user);
    return createdUser;
  }

  async updateUser(id, user) {
    if (!id) {
      throw new CodeError("Id is required", 400);
    }
    if (isNaN(id)) {
      throw new CodeError("Id must be a number", 400);
    }
    if (Object.values(user).length === 0) {
      throw new CodeError("User is required", 400);
    }
    const updatedUser = await userModel.update(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    if (!id) {
      throw new CodeError("Id is required", 400);
    }
    if (isNaN(id)) {
      throw new CodeError("Id must be a number", 400);
    }
    return await userModel.delete(id);
  }
}

module.exports = new UserService();
