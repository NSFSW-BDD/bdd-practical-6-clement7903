# Practice 

In this exercise, you will update API endpoints to add on bcrypt functionality for registration and login. Follow the instructions below: 

## Instructions

1. **Clone the repository**: Clone this repository to your local machine.

   ```shell
   git clone https://github.com/your-username/your-repository-name.git
   ```

2. **Navigate to the repository**: Change to the repository's directory.

   ```shell
   cd your-repository-name
   ```

3. **Install dependencies**: Install the necessary dependencies by running the following command.

   ```shell
   npm install
   ```

4. **Implement your Express.js application**: Create your Express.js application with the required endpoints and/or functionality based on the following specifications.

      **Part 1**
      
      **Register Endpoint**

      Modify the following code for the /register route in userRoutes.js:

      router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

      **Specifications:**
      
      HTTP Method: POST
   
      Route: /user/register

      **Controller Functions:**
   
      bcryptMiddleware.hashPassword:
      This middleware hashes the password provided in the request body using bcrypt and the specified number of salt rounds. The hashed password is stored in res.locals.hash for later use.

      userController.register:
      This function is responsible for handling the registration logic. It checks if the required fields (username, email, and password) are provided in the request body. It then inserts the new user into the database with the hashed password. If the insertion is successful, it stores the user's ID in res.locals for later use.

      jwtMiddleware.generateToken:
      This middleware generates a JWT token using the user's information stored in res.locals. The token is signed using the secret key and configured options.

      jwtMiddleware.sendToken:
      This middleware sends the generated JWT token in the response along with a success message.

      **Requirement:** 
      Create a new user with a unique username and email.
      
      Input JSON:
      username: a unique username
      email: a unique email address
      password: a password for the user

      Output:
      Status code: 200
      JSON body:
      message: User {username} created successfully.

      **Part 2**
   
      **Login Endpoint**

      Modify the following code for the /login route in userRoutes.js and its respective controller/model codes if necessary: 

      router.post("/login", userController.loginUser, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

      **Specifications:**

      HTTP Method: POST
   
      Route: /user/login

      **Controller Functions:**
   
      userController.loginUser: 

      This function is responsible for handling the login logic. It checks if the username and password are provided in the request body. It then queries the database to find the user with the provided username. If the user exists, it stores the user's information in res.locals for later use.

      bcryptMiddleware.comparePassword:
      This middleware compares the password provided in the request body with the hashed password stored in res.locals.hash. If the passwords match, it calls the next middleware.

      jwtMiddleware.generateToken:
   
      This middleware generates a JWT token using the user's information stored in res.locals. The token is signed using the secret key and configured options.

   
      jwtMiddleware.sendToken:
      This middleware sends the generated JWT token in the response along with a success message.

      **Requirement 1:**
      Return a JWT token if the username and password match.
      
      Input JSON:

      username: the username of the user

      password: the password of the user

      Output:
      Status code: 200

      JSON body:
      token: a JWT token

      **Requirement 2:**
      Return an error if the username or password is incorrect.
      
      Input JSON:
   
      username: a nonexistent username

      password: an incorrect password

      Output:
      Status code: 404 (Not Found)

      JSON body:
      message: "User not found"
   
6. **Submit your solution**:
   Once you finish testing your application, you can submit your solution for grading.

   Note: Make sure your Express.js application follows the specified endpoint URLs and handles requests and responses correctly according to the given instructions.
