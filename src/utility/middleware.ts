import { Request, Response, NextFunction } from "express";

import { invalidTokens } from "../models/investorModel";
import { verifyJwt } from "./authManager";



// EXTEND REQUEST TYPE

interface AuthRequest extends Request {
    user?: any;
}



// CHECK ACCESS

const checkAccess = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Response | void => {

    try {

        if (!req.user) {

            return res.status(401).json({
                message: "User not found"
            });
        }

        next();

    } catch (error: any) {

        console.log(error);

        return res.status(500).json({
            message: "Middleware Error",
            error: error.message
        });
    }
};

export {
    checkAccess
};