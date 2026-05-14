import client from "../utility/pgManager";



// TYPES

interface InvestorData {
    investor_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    pancard_no: string;
    aadhaar_no: string;
    date_of_birth: string;
    gender: string;
    occupation: string;
    passport_no?: string;
}

interface User {
    email: string;
    password: string;
    role: string;
    isLoggedIn: boolean;
}



// USERS

const users: User[] = [
    {
        email: "ganeshoggu@gmail.com",
        password: "12345",
        role: "investor",
        isLoggedIn: false
    }
];



// INVALID TOKENS

const invalidTokens: string[] = [];




// ADD INVESTOR

const addInvestor = async (
    data: InvestorData
) => {

    const {
        investor_id,
        first_name,
        middle_name,
        last_name,
        pancard_no,
        aadhaar_no,
        date_of_birth,
        gender,
        occupation,
        passport_no
    } = data;

    const query = `
        INSERT INTO investor(
            investor_id,
            first_name,
            middle_name,
            last_name,
            pancard_no,
            aadhaar_no,
            date_of_birth,
            gender,
            occupation,
            passport_no
        )
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    `;

    return client.query(query, [
        investor_id,
        first_name,
        middle_name,
        last_name,
        pancard_no,
        aadhaar_no,
        date_of_birth,
        gender,
        occupation,
        passport_no
    ]);
};




// FETCH INVESTOR

const fetchInvestor = async (
    investorId: string
) => {

    const query = `
        SELECT *
        FROM investor
        WHERE investor_id = $1
    `;

    return client.query(query, [investorId]);
};




// FETCH HOLDINGS

const fetchHoldings = async (
    investorId: string
) => {

    const query = `
        SELECT
            mf.fund_name,
            ph.total_units,
            nh.nav_value,
            (ph.total_units * nh.nav_value) AS current_value

        FROM portfolio_holdings ph

        JOIN portfolio p
        ON ph.portfolio_id = p.portfolio_id

        JOIN mutual_fund mf
        ON ph.fund_id = mf.fund_id

        JOIN nav_history nh
        ON mf.fund_id = nh.fund_id

        WHERE p.investor_id = $1

        AND nh.nav_date = (
            SELECT MAX(nav_date)
            FROM nav_history
            WHERE fund_id = mf.fund_id
        )
    `;

    return client.query(query, [investorId]);
};




// FETCH NET WORTH

const fetchNetWorth = async (
    investorId: string
) => {

    const query = `
        SELECT
            SUM(ph.total_units * nh.nav_value) AS total_networth

        FROM portfolio_holdings ph

        JOIN portfolio p
        ON ph.portfolio_id = p.portfolio_id

        JOIN nav_history nh
        ON ph.fund_id = nh.fund_id

        WHERE p.investor_id = $1

        AND nh.nav_date = (
            SELECT MAX(nav_date)
            FROM nav_history
            WHERE fund_id = ph.fund_id
        )
    `;

    return client.query(query, [investorId]);
};




// FETCH TRANSACTIONS

const fetchTransactions = async (
    investorId: string
) => {

    const query = `
    
        SELECT
            it.transaction_id,
            mf.fund_name,
            sr.sip_id,
            it.transaction_amount,
            it.nav_at_purchase,
            it.units_allocated,
            it.transaction_date

        FROM investment_transaction it

        JOIN sip_registration sr
        ON it.sip_id = sr.sip_id

        JOIN portfolio p
        ON sr.portfolio_id = p.portfolio_id

        JOIN mutual_fund mf
        ON it.fund_id = mf.fund_id

        WHERE p.investor_id = $1

        ORDER BY it.transaction_date DESC
    `;

    return client.query(query, [investorId]);
};




// LOGIN USER

const loginUser = async (
    email: string
) => {

    const query = `
        SELECT 
            u.user_id,
            u.email,
            u.password,
            i.investor_id
        FROM users u
        LEFT JOIN investor i
        ON u.user_id = i.user_id
        WHERE u.email = $1
    `;

    return client.query(query, [email]);
};

export {
    addInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetWorth,
    fetchTransactions,
    invalidTokens,
    loginUser
};