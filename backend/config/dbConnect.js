import mongoose from "mongoose";

const dbconnect = () => {
    let dbURI = process.env.DBURI;
    mongoose.connect(dbURI).then(() => {
        console.log("database connected successfully");
    }).catch((err) => console.log(err));
};
export default dbconnect;
