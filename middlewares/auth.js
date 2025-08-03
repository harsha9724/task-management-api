const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user")

async function auhtenticateUser(req, res, next) {
  try {
    let token;
    // Expecting "Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, Please provide the token" });
    }
      jwt.verify(token, process.env.JWT_SECRET,async (error,decoded)=>{
        if(error){
            return res.status(401).json({
                message:error.message
            })
        }
        let data = await User.findById(decoded.user_id)
        if (!data) return res.status(401).json({ message: 'User not found' });
        req.user_id = decoded.user_id;
        next();
      });
    
  } catch (error) {
     return res.status(401).json({ message: 'Invalid token' });
  }
}


module.exports= auhtenticateUser;