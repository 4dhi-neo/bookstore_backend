//http://localhost:3000/register+POST +{data}

const users = require("../Models/userModel")
const bcrypt=require("bcrypt")

//registration
exports.userRegister=async (req,res)=>{
    console.log("Inside register controller function")
    const {username,email,password}=req.body
    if(username && email && password ){
        try{
            const existingUser=await users.findOne({email})
            if(existingUser){
                res.status(403).json({"msg":"User Already Exists!!"})
            }
            else{
                const hashedPassword=await bcrypt.hash(password,10)
                const response =await users.create({username,email,password,role:Admin}) //need to change
                res.status(201).json(response)
            }
        }
        catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    }
    else{
        res.status(400).json({"msg":"Enter Valid Data"})
    }
}

//Login

exports.userLogin=(req,res)=>{
    res.status(201).json("Login Success")
}


//Profile Update

exports.profileUpdate=(req,res)=>{
    res.status(200).json("Profile")
}