
const express =require("express");
const { CreateNewUser, getAllUsers, getSingleUser, getSingleUserByusername, UpdateUser, UpdateUserPassword } = require("../controller/UserController");
const { Login}= require("../controller/UserController");

const router = express.Router();
  router.post("/User/", CreateNewUser);
  router.post("/Login", Login );
  router.get("/", getAllUsers);
  router.get("/:id", getSingleUser);
  router.get("/he/:username", getSingleUserByusername);
  router.put("/:id", UpdateUser);
  router.put("/:id/password", UpdateUserPassword);



    module.exports = router; 