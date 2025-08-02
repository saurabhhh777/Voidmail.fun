import mongoose from "mongoose";

const emailInboxSchema = new mongoose.Schema({
    sessionToken:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSession',
        required: true,
        default: null,
    },
    to:{
        type: String,
        required: true,
        default: null,
    },
    from:{
        type:String,
        required: true,
        default: null,
    },
    subject:{
        type:String,
        required: true,
        default: null,
    },
    text:{
        type:String,
        required: true,
        default: null,
    },
    html:{
        type:String,
        required: true,
        default: null,
    },
},{timestamps: true});

const EmailInbox = mongoose.model("EmailInbox", emailInboxSchema);

export default EmailInbox;