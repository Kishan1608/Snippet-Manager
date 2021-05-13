const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");


router.post("/", async(req, res) => {
    try{
        const {email, password, passwordVerify} = req.body;

        if(!email || !password || !passwordVerify) {
            return res.status(400).json({ errormessage: "Please enter all required field"});
        }

        if(password.length < 6){
            return res.status(400).json({ errormessage: "Please enter password of atleat 6 letters"});
        }

        if(password !== passwordVerify){
            return res.status(400).json({ errormessage: "Please enter same password to verify"});
        }

        //make sure no account exists for this email

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ errormessage: "Account Alredy exist"});
        }

        //hash the password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //save the user in database

        const newUser = new User({
            email, 
            passwordHash
        })
        
        const savedUser =  await newUser.save();

        //create a JWT token

        const token = JWT.sign({
            id: savedUser._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token,{httpOnly: true}).send();


    }catch{
        res.status(500).send();
    }
})

router.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ errormessage: "Please enter all required field"});
        }

        //get user acount

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({ errormessage: "Wrong Email or Password"});
        }

        const correctPassword = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );

        if(!correctPassword)
            return res.status(401).json({ errormessage: "Wrong Email or Password"});

        //create a JWT token

        const token = JWT.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token,{httpOnly: true}).send();


    }catch{
        res.status(500).send();
    }
})

router.get("/loggedIn", (req, res) => {
    try{
        const token = req.cookies.token;

        if(!token) return res.json(null);

        const validatedUser = JWT.verify(token, process.env.JWT_SECRET);
        
        res.json(validatedUser.id);
    }catch{
        return res.json(null);
    }
});

router.get("/logOut", (req, res) => {
    try{
        res.clearCookie("token").send();
    }catch{
        return res.json(null);
    }
})

module.exports = router;