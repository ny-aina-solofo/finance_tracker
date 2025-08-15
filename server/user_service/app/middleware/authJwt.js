const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const id = decodedToken.id;
        req.auth = {
            id: id
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};


module.exports = { 
    verifyToken
};