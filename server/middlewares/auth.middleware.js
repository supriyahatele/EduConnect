require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => { 
    const token = req.headers.authorization?.split(" ")[1];
    if(token) {
        jwt.verify(token,process.env.PRIVATE_KEY, (err, decoded) => {
            if(err){
                return res.status(401).json({message : 'invalid token or token expired'})
            }else{

                const role = decoded.role
                req.role = role;
                req.id = decoded.id;
                next();
            }
        })
    }else{
        res.status(404).json({message : 'your are not authorized'})
    }
}

module.exports = {
    auth
}