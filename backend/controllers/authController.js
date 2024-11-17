import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import CatchAsyncError from "../utils/CatchAsyncError.js"
import errorHandler from "../utils/errorHandler.js";

const loginUser = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return next(new errorHandler("Email Not Found", 404));
    }

    const passwordMatched = await user.comparePass(password);

    if (!passwordMatched) {
        return next(new errorHandler("Password Not Matched", 404));
    }

    const token = await user.getjwttoken();


    if (process.env.NODE_ENV == "production") {
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
    } else {
        res.cookie("token", token, {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
    }
    res.status(200).json({
        message: "Login successfully",
    });
});

const registerUser = CatchAsyncError(async (req, res, next) => {
    const { email, password, } = req.body;

    const user = new userModel({
        email,
        password,
    });
    await user.save();

    const token = await user.getjwttoken();
    if (!user) {
        return next(new errorHandler(message, 404));
    }

    res.cookie("token", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
        message: "User created successfully",
    });
});

const getUserProfile = CatchAsyncError(async (req, res, next) => {
    const _id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }

    const user = await userModel.findById(_id).select("name email phoneNo role");

    if (!user) {
        return next(new errorHandler("User not found with this ID", 404));
    }

    res.status(200).json({ user });
});

export { loginUser, registerUser, getUserProfile }