const express = require("express");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const router = express.Router();
const controller = require('../controllers/userController');

//create your routes eg router.get('/', controller.readAllUser);
router.get("/", jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, controller.getAllUser)
router.post("/", controller.createNewUser)
router.get("/:userid", controller.getUserById)
router.put("/:userid", controller.updateUserById)
router.delete("/:userid", controller.deleteUserById)
router.post("/login", controller.loginUser, jwtMiddleware.generateToken, jwtMiddleware.sendToken) // use post because a jwt is being created, add in more middleware if needed (controller.loginUser, jwtMiddleware.generateToken....)

router.get("/register", controller.checkUsernameOrEmailExist)
    // , bcryptMiddleware.hashPassword, controller.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

module.exports = router;