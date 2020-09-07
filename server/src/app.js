const express = require("express");
const app = express();

// Loading routes
const AuthRoutes = require("./routers/auth.routes");
const UserRoutes = require("./routers/user.routes");

app.use(express.json()); //  Con esto el servidor es capaz de entender en json (evita el body-parser)
app.use(express.urlencoded({ extended: true })); //Lee entiende datos del formulario html

// Routers basic
app.use(AuthRoutes);
app.use(UserRoutes);

module.exports = app;
