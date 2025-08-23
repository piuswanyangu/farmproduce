// import the user schema
const { User } = require("../models/farmProduce");
// import the bcrypt to hash the password
const bcrypt = require("bcrypt");
// import the jwt
const jwt = require("jsonwebtoken");
// import the secret key from the dotenv
const JWT_SECRET = process.env.JWT_SECRET;

// below is the controller to register an admin
exports.registerAdmin = async (req, res) => {
  // pick the details from the insomnia
  const { name, email, password, secretKey } = req.body;
  // console.log("The details of admin are",name,email,password,secretKey);
  // verify the admin secret key
  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ message: "Unathorized account creation" });
  }

  // check whether the user already exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with the Email already exist" });
  }
  // create the admin user
  // hash the password first
  const hashedPassword = await bcrypt.hash(password, 10);

  // proceed
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "admin",
  });
  // create the user
  const user = await newUser.save();
  // if registration is successfull return the user then
  res.status(201).json({ message: "Admin created successfully", user });
};

// below is the login route
exports.loginAdmin = async (req, res) => {
  try {
    // pick the details passed from insomnia/postman
    const { email, password } = req.body;

    // console.log(email, password);

    // 1. Check whether the email address passed is valid or not
    const user = await User.findOne({ email });
    // console.log("The details of the user are: ", user)

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email address could not be found." });
    }

    //2. compare the provided password with the one stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    //4. Generate JWT Token (will be needed when a person tries to login)
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "4h",
    });

    //5. send a success message
    res.json({
      message: "Login successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
};
