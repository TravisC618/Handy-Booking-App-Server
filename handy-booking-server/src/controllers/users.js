const User = require("../models/users");
const { generateToken } = require("../utils/jwt");
const { formatResponse } = require("../utils/helper");

/**
 * Register controller
 *    - if there is no email/phone validation after user registered,
 *      directly return token;
 *    - else, do not return token ==> instead login controller will return it
 */
async function addUser(req, res) {
  const { email, password, role } = req.body;

  // check existed email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return formatResponse(res, 400, "email already existed");
  }

  // creata a new user [instance]
  const newUser = new User({
    email,
    password,
    role
  });

  // hash plain pwd and save
  await newUser.hashPassword();

  await newUser.save();
  // generate token and return
  const token = generateToken(newUser.role);
  return formatResponse(res, 201, "Successfully registered", {
    email,
    token
  });
}

module.exports = {
  addUser
};
