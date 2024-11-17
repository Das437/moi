import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    placeofbirth: {
        type: String,
        required: true,
    },
    passportnation: {
        type: String,
        required: true,
    },
    passportno: {
        type: String,
        required: true,
    },
    passportexpirydate: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    sponsername: {
        type: String,
        required: true,
    },
    purposeofvisa: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    contractyear: {
        type: String,
        required: true,
    },
    probationmonth: {
        type: String,
        required: true,
    },
    basicsalary: {
        type: String,
        required: true,
    },
    houseallowance: {
        type: String,
    },
    transportallowance: {
        type: String,
    },
    foodallowance: {
        type: String,
    },
    otherallowance: {
        type: String,
    },
    totalsalary: {
        type: String,
        required: true,
    },
    ticketduration: {
        type: String,
        required: true,
    },
    apllicationstatus: {
        type: String,
        required: true,
        default : "pending"
    }

}
)

export default mongoose.model("application", applicationSchema)