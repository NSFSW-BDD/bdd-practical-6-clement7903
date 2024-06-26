const model = require("../models/userModel");

var userController = {
    getAllUser: (req, res, next) => {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllUser:", error);
                res.status(500).json(error);
            }
            else res.status(200).json(results);
        }

        model.selectAllUsers(callback);
    }

    , getUserById: (req, res, next) => {
        const data = {
            userid: req.params.userid
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readUserById:", error);
                res.status(500).json(error);
            } else {
                if (results.length == 0) {
                    res.status(404).json({
                        message: "User not found when doing getUserById"
                    });
                }
                else res.status(200).json(results[0]);
            }
        }

        model.selectUserById(data, callback);
    },

    createNewUser: (req, res, next) => {

        const data = {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error createNewUser:", error);
                res.status(500).json(error);
            } else {
                res.status(201).json(results);
            }
        }

        model.insertNewUser(data, callback);
    },
    updateUserById: (req, res, next) => {

        const data = {
            id: req.params.id,
            username: req.body.username,
            email: req.body.email
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error updateUserById:", error);
                res.status(500).json(error);
            } else {
                if (results.affectedRows == 0) {
                    res.status(404).json({
                        message: "User not found"
                    });
                }
                else res.status(204).send(); // 204 No Content
            }
        }

        model.updateUserById(data, callback);
    }

    , deleteUserById: (req, res, next) => {
        const data = {
            userid: req.params.userid
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error deleteUserById:", error);
                res.status(500).json(error);
            } else {
                if (results.affectedRows == 0) {
                    res.status(404).json({
                        message: "User not found"
                    });
                }
                else res.status(204).send(); // 204 No Content            
            }
        }

        model.deleteUserById(data, callback);
    },

    loginUser: (req, res, next) => {
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error loginUser:", error);
                res.status(500).json(error);
            } else {
                if (results.length == 0) {
                    console.log(data.email)
                    console.log(data.password)

                    res.status(404).json({
                        message: "User not found"
                    });
                }
                else {
                    res.locals.userid = results[0].userid
                    res.locals.role = results[0].role;
                    res.locals.email = results[0].email;
                    res.locals.hash = results[0].password;
                    next()
                }
            }
        }
        model.loginUser(data, callback);
    },

    checkUsernameOrEmailExist: (req, res, next) => {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        if (!data.username || !data.email || !data.password) {
            console.log(`Missing details ${data.username}, ${data.email}, ${data.password}`)
            return res.status(400).json({
                error: "Username, email, and password are required."
            });
        }

        console.log("Checking if username/email exists: ", data.username, data.email)

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error checkUsernameOrEmailExist:", error);
                res.status(500).json(error);
            } else {
                if (results.length == 0) {
                    console.log("User not found when doing checkUsernameOrEmailExist")
                    next()
                }
                else {
                    console.log("Existing user is found")
                    res.locals.username = results[0].username
                    res.locals.email = results[0].email;
                    res.status(200).json(results);
                }
            }
        }
        model.selectUserByUsernameOrEmail(data, callback);
    },

    register: (req, res, next) => {
        const data = {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role || "user",
            password: res.locals.hash,
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error register:", error);
                res.status(500).json(error);
            } else {
                console.log(`Registering user with the following details 
                                    Username: ${data.username}, 
                                    Email: ${data.email}, 
                                    Role: ${data.role}, 
                                    Hashed Password: ${data.password}
                                    `)
                res.locals.message = `User ${data.username} created successfully!`
                next()
            }
        }
        model.insertNewUser(data, callback)
    }
}

module.exports = userController;