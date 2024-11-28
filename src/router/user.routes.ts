
import { Router } from "express";
import { registerUser, loginUser, verifyToken } from "../controller/user.controller";
import { checkQuery, checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyToken);

