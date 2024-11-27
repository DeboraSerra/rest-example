const express = require("express");
const app = express();

app.use(express.json());

const userController = require("./controller/user.controller.js");

app.get("/users/all_users", userController.getUsers);
app.get("/users/get_user/:id", userController.getUser);
app.post("/users/create_user", userController.createUser);
app.put("/users/update_user/:id", userController.updateUser);
app.delete("/users/delete_user/:id", userController.deleteUser);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
