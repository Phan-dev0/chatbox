const express = require("express");
const {test, registerUser, loginUser, findUserById, getUsers} = require("../Controllers/userController");
const router = express.Router();

router.get("/test", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUserById);
router.get("/", getUsers);




module.exports = router;