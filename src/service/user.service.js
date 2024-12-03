const CodeError = require("../helpers/error.helper.js");
const userModel = require("../model/user.model.js");
const { statusCodes } = require("../statusCodes.js");

class UserService {
  async getUserById(id) {
    if (!id) {
      throw new CodeError("Id is required", statusCodes.BAD_REQUEST);
    }
    if (isNaN(id)) {
      throw new CodeError("Id must be a number", statusCodes.BAD_REQUEST);
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
      throw new CodeError("User is required", statusCodes.BAD_REQUEST);
    }
    if (!name) {
      throw new CodeError("Name is required", statusCodes.BAD_REQUEST);
    }
    if (!age) {
      throw new CodeError("Age is required", statusCodes.BAD_REQUEST);
    }
    if (!city) {
      throw new CodeError("City is required", statusCodes.BAD_REQUEST);
    }
    if (!country) {
      throw new CodeError("Country is required", statusCodes.BAD_REQUEST);
    }
    if (!phone) {
      throw new CodeError("Phone is required", statusCodes.BAD_REQUEST);
    }
    if (!email) {
      throw new CodeError("Email is required", statusCodes.BAD_REQUEST);
    }
    const createdUser = await userModel.create(user);
    return createdUser;
  }

  async updateUser(id, user) {
    if (!id) {
      throw new CodeError("Id is required", statusCodes.BAD_REQUEST);
    }
    if (isNaN(id)) {
      throw new CodeError("Id must be a number", statusCodes.BAD_REQUEST);
    }
    if (Object.values(user).length === 0) {
      throw new CodeError("User is required", statusCodes.BAD_REQUEST);
    }
    const updatedUser = await userModel.update(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    if (!id) {
      throw new CodeError("Id is required", statusCodes.BAD_REQUEST);
    }
    if (isNaN(id)) {
      throw new CodeError("Id must be a number", statusCodes.BAD_REQUEST);
    }
    return await userModel.delete(id);
  }
}

module.exports = new UserService();
