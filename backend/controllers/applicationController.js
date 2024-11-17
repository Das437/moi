import mongoose from "mongoose";
import applicationModel from "../models/applicationModel.js"
import CatchAsyncError from "../utils/CatchAsyncError.js";
import errorHandler from "../utils/errorHandler.js";

const createApllication = CatchAsyncError(async (req, res, next) => {


    const { firstname, lastname, dateofbirth, placeofbirth, passportnation, passportno, passportexpirydate, phoneno, gender, sponsername, purposeofvisa, profession, email, education, contractyear, probationmonth, basicsalary, houseallowance, transportallowance, foodallowance, otherallowance, totalsalary, ticketduration } = req.body

    if (!firstname) {
        return next(new errorHandler("First Name is reurired ", 404));
    }
    if (!lastname) {
        return next(new errorHandler("Last Name is reurired ", 404));
    }
    if (!dateofbirth) {
        return next(new errorHandler("Date Of Birth is reurired ", 404));
    }
    if (!placeofbirth) {
        return next(new errorHandler("Place Of Birth is reurired ", 404));
    }
    if (!passportnation) {
        return next(new errorHandler("Passport Nationality is reurired ", 404));
    }
    if (!passportno) {
        return next(new errorHandler("Passport Number is reurired ", 404));
    }
    if (!passportexpirydate) {
        return next(new errorHandler("Passport Expiry Date is reurired ", 404));
    }
    if (!phoneno) {
        return next(new errorHandler("Phone No is reurired ", 404));
    }
    if (!gender) {
        return next(new errorHandler("Gender is reurired ", 404));
    }
    if (!sponsername) {
        return next(new errorHandler("Sponser Name is reurired ", 404));
    }
    if (!purposeofvisa) {
        return next(new errorHandler("Purpose Of Visa is reurired ", 404));
    }
    if (!profession) {
        return next(new errorHandler("Profession is reurired ", 404));
    }
    if (!email) {
        return next(new errorHandler("Email is reurired ", 404));
    }
    if (!education) {
        return next(new errorHandler("Education is reurired ", 404));
    }
    if (!contractyear) {
        return next(new errorHandler("Contract Duration Year is reurired ", 404));
    }
    if (!probationmonth) {
        return next(new errorHandler("No Of Probation Months is reurired ", 404));
    }
    if (!basicsalary) {
        return next(new errorHandler("Basic Salary is reurired ", 404));
    }
    if (!houseallowance) {
        return next(new errorHandler("House Allowance is reurired ", 404));
    }
    if (!transportallowance) {
        return next(new errorHandler("Transport Allowance is reurired ", 404));
    }
    if (!otherallowance) {
        return next(new errorHandler("Other Allowance is reurired ", 404));
    }
    if (!totalsalary) {
        return next(new errorHandler("Total Salary is reurired ", 404));
    }
    if (!ticketduration) {
        return next(new errorHandler("Ticket Duration is reurired ", 404));
    }


    const apllication = new applicationModel({
        firstname, lastname, dateofbirth, placeofbirth, passportnation, passportno, passportexpirydate, phoneno, gender, sponsername, purposeofvisa, profession, email, education, contractyear, probationmonth, basicsalary, houseallowance, transportallowance, foodallowance, otherallowance, totalsalary, ticketduration
    })

    const result = await apllication.save()

    res.status(200).json({
        message: "Application Submited Succesfully"
    })

})

const updateApllication = CatchAsyncError(async (req, res, next) => {
    const { _id, apllicationstatus } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild user id", 404));
    }
    const apllication = await applicationModel.findById(_id)
    if (apllication.apllicationstatus == "reject" || apllication.apllicationstatus == "accept") {
        return next(new errorHandler("Application Already Updated", 406));
    }

    const result = await applicationModel.findByIdAndUpdate(_id, { apllicationstatus })

    if (!result) {
        return next(new errorHandler("Application not found with this ID", 404));
    }

    res.status(200).json({
        message: "Application Updated Succesfully"
    })
})

const getAllApplication = CatchAsyncError(async (req, res, next) => {
    const result = await applicationModel.find()

    res.status(200).json({
        result
    })
})

const getApplication = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild application id", 404));
    }

    const application = await applicationModel.findById(id)

    res.status(200).json({
        application,
        fronturl: process.env.FRONT_URL
    })


})

export { createApllication, updateApllication, getAllApplication, getApplication }