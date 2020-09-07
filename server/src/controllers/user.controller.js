const User = require("../models/User");
const jwt = require("../utils/jwt");

async function Register(req, res) {
  const body = req.body;
  const user = new User(body);

  user.password = await user.encryptPassword(user.password);
  const userSaved = await user.save();

  const accessToken = jwt.createAccessToken(userSaved);
  const refreshToken = jwt.createRefreshToken(userSaved);

  res.json({ auth: true, accessToken, refreshToken });
}

async function getUsers(req, res) {
  const users = await User.find();
  res.send(users);
}

async function Login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "Email not registered" });
  }

  const isAuthenticated = await user.verifyPassword(password);
  if (!isAuthenticated) {
    return res.status(401).json({
      auth: false,
      token: null,
    });
  }

  const accessToken = jwt.createAccessToken(user);
  const refreshToken = jwt.createRefreshToken(user);

  res.json({ auth: true, accessToken, refreshToken });
}

module.exports = {
  Register,
  Login,
  getUsers,
};
