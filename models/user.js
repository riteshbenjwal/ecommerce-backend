const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false, //This will not be returned when querying the user
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt password before saving using hooks

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Validate the password with passed on user password - input password checking with database password

userSchema.methods.isValidatePassword = async function (usersendPassword) {
  return await bcrypt.compare(usersendPassword, this.password);
};

//create and return jwt token

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

//generate forget password token (string)

userSchema.methods.getForgotPasswordToken = function () {
  //Generate a long and random string
  const forgetToken = crypto.randomBytes(20).toString("hex");

  //getting a hash - hashing the token on db

  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgetToken)
    .digest("hex");

  //time of token expiry

  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return forgetToken;
};

module.exports = mongoose.model("User", userSchema);
