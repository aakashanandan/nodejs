
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { response } from "../helper/commonResponseHandler";
import { errorMessage, clientError } from "../helper/ErrorMessage";
import { User } from "../model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "your_jwt_secret";

const response = (
    req: Request,
    res: Response,
    activity: string,
    level: string,
    action: string,
    isSuccess: boolean,
    statusCode: number,
    data: object,
    message: string,
    errorDetails: string | null = null
) => {
    res.status(statusCode).json({
        activity,
        level,
        action,
        isSuccess,
        statusCode,
        data,
        message,
        errorDetails,
    });
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword });
        await user.save();

        response(req, res, "User Registration", 'Level-3', 'Register', true, 201, {}, "User registered successfully.");
    } catch (error) {
        response(req, res, "User Registration", 'Level-3', 'Register', false, 500, {}, "Registration failed.", error.message);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return response(req, res, "User Login", 'Level-3', 'Login', false, 401, {}, "Invalid email or password.");
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        response(req, res, "User Login", 'Level-3', 'Login', true, 200, { token }, "Login successful.");
    } catch (error) {
        response(req, res, "User Login", 'Level-3', 'Login', false, 500, {}, "Login failed.", error.message);
    }
};

export const verifyToken = (req: Request, res: Response) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        response(req, res, "Token Verification", 'Level-3', 'Verify', true, 200, {}, "Token is valid.");
    } catch {
        response(req, res, "Token Verification", 'Level-3', 'Verify', false, 200, {}, "Token is invalid.");
    }
};


