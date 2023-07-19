import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try{
        let token = req.header('Authorization');
        if(!token) {
            return res.status(403).json({message: "No token, authorization denied"});
        }
        if(token.startsWith('Bearer ')) {  // Remove Bearer from string (OAuth2 protocol)
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }

}