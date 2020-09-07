const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}

UserSchema.methods.verifyPassword = function(password){
    return bcrypt.compare(password, this.password) // Compara la contraseña y devuelve un booleano si es igual o no
}

module.exports = model("User", UserSchema);