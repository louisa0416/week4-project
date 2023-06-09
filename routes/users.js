const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/users");

router.get("/", userControllers.getUsers);
router.post("/", userControllers.createUser);

module.exports = router;
