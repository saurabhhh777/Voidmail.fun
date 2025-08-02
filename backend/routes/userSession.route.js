import express from "express";

const route = express.Router();

import { createUserSession,createEmail  } from "../controllers/userSession.controller.js";


route.route('/createUserSession').post(createUserSession);
route.route('/createEmail').post(createEmail);

export default route;