//http://localhost:3000/register+POST +{data}

const users = require("../Models/userModel")
const bcrypt=require("bcrypt")
const { json } = require("express")
const jwt=require("jsonwebtoken")

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
                const response =await users.create({username,email,password:hashedPassword}) 
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


    exports.userLogin=async(req,res)=>{
    const {email,password}=req.body
    const existingUser=await users.findOne({email})
    if(existingUser){
        console.log(existingUser)
        const passwordResult=await bcrypt.compare(password,existingUser.password)
        if(passwordResult){
            const token=jwt.sign({userId:existingUser.id,userMail:existingUser.email},process.env.SECRET_KEY)
            res.status(200).json({"token":token,"user":existingUser})
        }
        else{
            res.status(401).json({"msg":"Invalid Email/Password!"})
        }
    }
    else{
        res.status(401).json({"msg":"Invalid Email/Password"})
    }
    
}




//Google auth login
exports.googleLogin=async(req,res)=>{
    
        const{email,name,picture}=req.body
        const existingUser=await users.findOne({email})
        if(existingUser){
            console.log(existingUser)
             const token=jwt.sign({userId:existingUser.id,userMail:existingUser.email},process.env.SECRET_KEY)
             res.status(200).json({"token":token,"user":existingUser})

        }
        else{
            const newUser=await users.create({username:name,email,password:"123",picture:picture})
            console.log(newUser)
            const token=jwt.sign({userId:newUser._id,userMail:newUser.email},process.env.SECRET_KEY)
            res.status(200).json({"token":token,"user":newUser})
        }

  

}



//Profile Update

exports.profileUpdate=async(req,res)=>{
    // console.log(req.body)
    // console.log(req.file)
    // console.log(req.params)
    // console.log(req.query)
    // console.log(req.payload)
    const {username,email,password,bio,picture}=req.body
    const id=req.payload?.userId
    const pic=req.file?req.file.filename:picture
    const encryptedPassword=await bcrypt.hash(password,10)
    const updatedUser=await users.findByIdAndUpdate({_id:id},
    {username,email,password:encryptedPassword,bio,picture:pic},{new:true})
    res.status(200).json("Profile")
}