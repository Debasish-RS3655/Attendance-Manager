const express = require("express");
const router = express.Router();

const { register, login, update, deleteUser, getUsers } = require("./auth");
const { adminAuth } = require("../middleware/auth");

//creating a post request listener for the register page
router.route("/register").post(register);
//the post request listener for the login page
router.route("/login").post(login);
router.route("/update").put(adminAuth, update);
router.route("/deleteUser").delete(adminAuth, deleteUser);
router.route("/getUsers").get(getUsers);

module.exports = router;
