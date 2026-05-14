import express, {
    Request,
    Response
} from "express";

import cors from "cors";

import client from "./utility/pgManager";

import investorRoutes from "./routes/investorRoutes";
import profileRoutes from "./routes/profileRoutes";

const app = express();



// MIDDLEWARES

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000"
    })
);




// HOME ROUTE

app.get(
    "/",
    (
        req: Request,
        res: Response
    ) => {

        res.send("Backend Running");
    }
);




// ROUTES

app.use(
    "/api/investors",
    investorRoutes
);

app.use(
    "/api/profile",
    profileRoutes
);




// SERVER

app.listen(4000, () => {

    console.log(
        "Server running on port 4000"
    );
});