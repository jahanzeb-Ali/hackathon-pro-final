import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../modules/User.js";
import jwt from "jsonwebtoken";
const app = Router();

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        })
    }
    const user = await User.findOne({ email })
    if (user) {
        return res.status(403).json({
            success: false,
            message: "User already exist"
        })
    }
    const encryptPass = await bcrypt.hash(password, 2)
   
    const jwtToken = jwt.sign({ ...user }, process.env.Jwt_token_Secret)
    const newUser = new User({ name, email, password: encryptPass})
    await newUser.save();
    res.status(200).json({
        success: true,
        message: "user created",
        data: {name,email,password: encryptPass,token:jwtToken}
     })
        
})

app.post("/login", async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "No user Found",
        })
    }
    const isValidPass = await bcrypt.compare(password,user.password)
    if (!isValidPass) {
        return  res.status(400).json(
            {
            success: false,
            message: "Password is wrong.",
        }
        ) 
    }
    const userData = user.toObject();
    delete userData.password;
    const jwtToken = jwt.sign({ ...userData }, process.env.Jwt_token_Secret)
    return res.status(200).json({
            success: true,
            message: "User login successfully.",
            data:{...userData, token:jwtToken}
        })
})

export default app;