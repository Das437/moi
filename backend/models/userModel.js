import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: "Please enter a valid email",
            },
        },
        password: {
            type: String,
            required: true,
            select: false,
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 7);
});

userSchema.methods.getjwttoken = function () {
    const token = jwt.sign(
        {
            email: this.email,
        },
        process.env.JWTSECRET,
        { expiresIn: process.env.EXPIREIN }
    );

    return token;
};

userSchema.methods.comparePass = async function (plainpass) {
    return await bcrypt.compare(plainpass, this.password);
};
export default mongoose.model("user", userSchema);
