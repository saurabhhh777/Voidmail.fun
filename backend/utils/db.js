import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("mongoDB connected successfully");
        });
    } catch (error) {
        console.log("MongoDb error ",error);
    }
}

export default connectDB;