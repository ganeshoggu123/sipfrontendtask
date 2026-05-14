import jwt, { JwtPayload } from "jsonwebtoken";
const secretKey = "fjnfaefn124545415";



// SIGN JWT

const signJwt = (
    payload: string | object | Buffer
): string | undefined => {

    try {

        const token = jwt.sign(
            payload,
            secretKey,
            {
                expiresIn: "15m"
            }
        );

        return token;

    } catch (error) {

        console.log(error);
    }
};




// VERIFY JWT

const verifyJwt = (
    token: string
): JwtPayload | string | object => {

    try {

        const payload = jwt.verify(
            token,
            secretKey
        );

        return payload;

    } catch (error) {

        return {
            status: 401,
            message: "Invalid Token",
            error: 0
        };
    }
};

export {
    signJwt,
    verifyJwt
};