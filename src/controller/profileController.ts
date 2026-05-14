import { Request, Response } from "express";

import client from "../utility/pgManager";



const getProfile = async (
    req: Request,
    res: Response
): Promise<Response> => {

    try {

        const { investorId } = req.params;

        // INVESTOR DETAILS

        const investorQuery = await client.query(

            `
            SELECT *
            FROM investor
            WHERE investor_id = $1
            `,
            [investorId]
        );



        // CONTACT DETAILS

        const contactQuery = await client.query(

            `
            SELECT *
            FROM investor_contact
            WHERE investor_id = $1
            `,
            [investorId]
        );



        // BANK DETAILS

        const bankQuery = await client.query(

            `
            SELECT
                bank.bank_name,
                bank.ifsc_code,
                investor_bank.account_no,
                investor_bank.account_type

            FROM investor_bank

            JOIN bank
            ON investor_bank.bank_id = bank.bank_id

            WHERE investor_bank.investor_id = $1
            `,
            [investorId]
        );



        // PORTFOLIO DETAILS

        const portfolioQuery = await client.query(

            `
            SELECT *
            FROM portfolio
            WHERE investor_id = $1
            `,
            [investorId]
        );



        // AMC DETAILS

        const amcQuery = await client.query(

            `
            SELECT
                amc.amc_name,
                amc.registration_no,
                mutual_fund.fund_name,
                mutual_fund.fund_category,
                mutual_fund.fund_type

            FROM portfolio

            JOIN portfolio_holdings
            ON portfolio.portfolio_id =
               portfolio_holdings.portfolio_id

            JOIN mutual_fund
            ON portfolio_holdings.fund_id =
               mutual_fund.fund_id

            JOIN amc
            ON mutual_fund.amc_id = amc.amc_id

            WHERE portfolio.investor_id = $1
            `,
            [investorId]
        );



        return res.json({

            investor: investorQuery.rows[0],

            contacts: contactQuery.rows,

            banks: bankQuery.rows,

            portfolios: portfolioQuery.rows,

            amcs: amcQuery.rows
        });

    } catch (err: any) {

        console.log(err);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export {
    getProfile
};