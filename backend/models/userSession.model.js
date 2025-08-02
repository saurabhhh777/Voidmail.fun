import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    email:{
      type:String,
      // required:true,
      // default:'xyz',
    },
    expiresAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const UserSession = mongoose.model("UserSession", userSessionSchema);

export default UserSession;