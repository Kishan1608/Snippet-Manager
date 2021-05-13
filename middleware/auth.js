const JWT = require("jsonwebtoken");

function Auth(req, res, next) {
    try{
        const token = req.cookies.token;

        if(!token) return res.status(401).json({errormessage: "Unauthorized"});

        const validatedUser = JWT.verify(token, process.env.JWT_SECRET);
        req.user = validatedUser.id;
        
        next();
    }catch{
        res.status(401).json({errormessage: "Unauthorized"});
    }
}

module.exports = Auth;