const express = require("express");
const userController = require("../controllers/userController");
const jwtMiddleware=require("../middlewares/jwtMiddleware");
const router = express.Router();


module.exports = router;