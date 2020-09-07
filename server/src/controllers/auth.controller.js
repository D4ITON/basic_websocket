const User = require("../models/User");
const jwt = require("../utils/jwt");
const { isTokenVerified } = require("../utils/verifyToken");

async function refreshAccessToken(req, res) {
    const { refreshToken } = req.body;
    const { ok, response } = isTokenVerified(refreshToken);

    if (!ok) {
        return res.send({ auth: false, message: response });
    }

    const user = await User.findOne({ _id: response });

    const accessToken = jwt.createAccessToken(user);
    const renewedRefreshToken = jwt.createRefreshToken(user);

    return res.json({
        auth: true,
        accessToken,
        refreshToken: renewedRefreshToken,
    });
}

// router.post("/signup", async (req, res, next) => {
//     const { username, email, password } = req.body;

//     const user = new User({
//         username,
//         email,
//         password,
//     });
//     user.password = await user.encryptPassword(user.password);
//     await user.save();

//     const token = jwt.sign({ id: user._id }, MyKey, {
//         // expiresIn: 60 * 60 * 24,
//         expiresIn: 10, // solo dura 10 segundos
//     });

//     res.json({ auth: true, token });
// });

// router.get("/username", verifyToken, async (req, res, next) => {
//     const user = await User.findById(req.userId, { password: 0 });
//     if (!user) {
//         return res.status(404).send("User not found");
//     } else {
//         res.json(user);
//     }
// });

// router.post("/signin", async (req, res, next) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email: email });
//     if (!user) {
//         return res.status(404).send("Email not registered");
//     }
//     const isAuthenticated = await user.verifyPassword(password);

//     if (!isAuthenticated) {
//         return res.status(401).json({
//             auth: false,
//             token: null,
//         });
//     }

//     const token = jwt.sign({ id: user._id }, MyKey, {
//         // expiresIn: 60 * 60 * 24,
//         expiresIn: 10, // solo dura 10 segundos
//     });

//     res.send({ auth: true, token });
// });

module.exports = {
    refreshAccessToken,
};
