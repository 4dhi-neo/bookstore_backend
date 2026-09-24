const express=require('express')
const userController=require('../Controllers/userController')

const router=new express.Router()

//Registration

router.post('/register',userController.userRegister)



//login

router.post('/login',userController.userLogin)

//Profile Update

router.get('/profile-update',userController.profileUpdate)





module.exports=router