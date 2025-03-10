import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"




export const verifyJWT = asyncHandler(async (req, _, next) => { // "_" if req,res any of this is unused
    try {
        let token = req.cookies?.accessToken
        if(!token){
            token = req.headers.authorization?.split(" ")[1];
        }
        console.log(token);
        
    
        if(!token){
            throw new ApiError(401,"unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        console.log("🔍 Searching for user IDD:", decodedToken._id);
        //console.log("✅ MongoDB Connection Status:", mongoose.connection.readyState);
        
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        //console.log("✅ User found:", user);
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user
        next()


    } catch (error) {
        throw new ApiError(401,error.message || "invalid access token message from catch block")
    }
})