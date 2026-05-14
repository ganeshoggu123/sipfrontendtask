import client from "../utility/pgManager";



// TYPES

interface FundData {
    fund_id: string;
    amc_id: string;
    fund_name: string;
    fund_category: string;
    fund_type: string;
}

interface NAVData {
    fund_id: string;
    nav_value: number;
    nav_date: string;
}



// ADD FUND

const addFund = async (
    data: FundData
) => {

    const {
        fund_id,
        amc_id,
        fund_name,
        fund_category,
        fund_type
    } = data;

    const query = `
        INSERT INTO mutual_fund(
            fund_id,
            amc_id,
            fund_name,
            fund_category,
            fund_type
        )
        VALUES($1,$2,$3,$4,$5)
    `;

    return client.query(query, [
        fund_id,
        amc_id,
        fund_name,
        fund_category,
        fund_type
    ]);
};




// FETCH FUNDS

const fetchFunds = async () => {

    const query = `
        SELECT *
        FROM mutual_fund
        ORDER BY fund_name
    `;

    return client.query(query);
};




// INSERT NAV

const insertNAV = async (
    data: NAVData
) => {

    const {
        fund_id,
        nav_value,
        nav_date
    } = data;

    const query = `
        INSERT INTO nav_history(
            fund_id,
            nav_value,
            nav_date
        )
        VALUES($1,$2,$3)
    `;

    return client.query(query, [
        fund_id,
        nav_value,
        nav_date
    ]);
};

export {
    addFund,
    fetchFunds,
    insertNAV
};