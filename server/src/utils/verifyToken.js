/**
 * Simula el funcionamiento del middleware
 */
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "No token provided",
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({
            auth: false,
            message: err.message,
        });
    }
};

/**
 * Verifica si el token es valido
 * @param {String} token
 * @returns {Object} Si tuvo errores o userId
 */
exports.isTokenVerified = (token) => {
    if (!token) {
        return {
            err: "No token provided",
        };
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return {
            ok: true,
            response: decoded.id,
        };
    } catch (err) {
        return {
            ok: false,
            response: err.message,
        };
    }
};

/**
 * Cuerpo de token expirado
 *
    "err": {
        "name": "TokenExpiredError",
        "message": "jwt expired",
        "expiredAt": "2020-06-12T14:46:31.000Z"
    }


    Cuerpo token con firma inválida (diferente secretKey)

    "err": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    }
 */
