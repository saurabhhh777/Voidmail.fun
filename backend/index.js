import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
import UserRoute from "./routes/userSession.route.js";
import EmailRoute from "./routes/emailInbox.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

import connectDB from "./utils/db.js";

//database connection
connectDB();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: ["https://www.voidmail.fun","https://mail.voidmail.fun"], // only allow frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
  

app.use("/api/v1/user",UserRoute);
app.use("/api/v1/email",EmailRoute);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
