/**
 * Funciones para crear el token de acceso y de refresco
 */

require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.createAccessToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
    };

    return (token = jwt.sign(payload, SECRET_KEY, {
        // expiresIn: 60 * 60 * 3, // 3 horas
        expiresIn: 10,
    }));
};

exports.createRefreshToken = (user) => {
    const payload = {
        id: user._id,
    };

    return (token = jwt.sign(payload, SECRET_KEY, {
        // expiresIn: 60 * 60 * 24, // 24 horas
        expiresIn: 20,
    }));
};
