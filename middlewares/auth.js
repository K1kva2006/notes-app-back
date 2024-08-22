const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
    const AuthToken = req.headers.authorization.split(" ")[1];
    if (!AuthToken) {
        return res.status(400).json("Need Token for authorization");
    }

    jwt.verify(AuthToken, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json("Token is not valid");
        }
        req.user = decode;
    });
    next();
};
module.exports = Auth;
