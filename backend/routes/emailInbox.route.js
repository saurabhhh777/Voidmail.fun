import express from "express";

const route = express.Router();

import { getAllEmails, saveEmail  } from "../controllers/emailInbox.controller.js";


route.route('/saveEmail').post(saveEmail);
route.route('/getAllEmails').post(getAllEmails);



export default route;