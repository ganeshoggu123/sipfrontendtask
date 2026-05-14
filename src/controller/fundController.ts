import { Request, Response } from "express";

import {
    addFund,
    fetchFunds,
    insertNAV
} from "../models/fundModel";



// CREATE FUND

const createFund = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        await addFund(req.body);

        return res.status(201).json({
            message: "Fund created successfully"
        });

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Error creating fund",
            error: err.message
        });
    }
};




// GET ALL FUNDS

const getFunds = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const result = await fetchFunds();

        return res.status(200).json(result.rows);

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Error fetching funds",
            error: err.message
        });
    }
};




// UPDATE NAV

const updateNAV = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const fundId = String(req.params.fundId);

        const data = {
            fund_id: fundId,
            nav_value: req.body.nav_value,
            nav_date: req.body.nav_date
        };

        await insertNAV(data);

        return res.status(200).json({
            message: "NAV updated successfully"
        });

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Error updating NAV",
            error: err.message
        });
    }
};

export {
    createFund,
    getFunds,
    updateNAV
};