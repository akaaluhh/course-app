const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next)
{
    const token = req.headers.token;
    const response = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if (response)
    {
        req.userId = response.id;
        next();
    }
    else
    {
        res.status(403).json({ message: "You are not signed in" });
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
};