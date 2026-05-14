import { Request, Response } from "express";

import {
    addInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetWorth,
    fetchTransactions,
    loginUser
} from "../models/investorModel";

import { signJwt } from "../utility/authManager";



// CREATE INVESTOR

const createInvestor = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        await addInvestor(req.body);

        return res.status(201).json({
            message: "Investor created successfully"
        });

    } catch (err: any) {

        console.log(err);

        if (err.code === "23505") {

            return res.status(400).json({
                message: "Investor already exists"
            });
        }

        return res.status(500).json({
            message: "Error creating investor"
        });
    }
};




// GET INVESTOR

const getInvestor = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const investorId = String(req.params.investorId);

        const result = await fetchInvestor(investorId);

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Investor not found"
            });
        }

        return res.status(200).json(result.rows[0]);

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Error fetching investor"
        });
    }
};




// GET HOLDINGS

const getHoldings = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const investorId = String(req.params.investorId);

        const result = await fetchHoldings(investorId);

        return res.status(200).json(result.rows);

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Error fetching holdings"
        });
    }
};




// GET NET WORTH

const getNetWorth = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const investorId = String(req.params.investorId);

        const result = await fetchNetWorth(investorId);

        return res.status(200).json(result.rows[0]);

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Error fetching net worth"
        });
    }
};




// GET TRANSACTIONS

const getTransactions = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const investorId = String(req.params.investorId);

        const result = await fetchTransactions(investorId);

        return res.status(200).json(result.rows);

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Error fetching transactions"
        });
    }
};




// LOGIN

const login = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const { email, password } = req.body;

        const result = await loginUser(email);

        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        if (user.password !== password) {

            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = signJwt({
            email: user.email
        });

        return res.status(200).json({
            message: "Login Success",
            token,
            investorId: user.investor_id,
            userId: user.user_id,
            email: user.email
        });

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Login Error"
        });
    }
};

export {
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth,
    getTransactions,
    login
};