const express=require('express')
const userController=require('../Controllers/userController')
const multerMiddleware=require('../middleware/multerMiddleware')
const router=new express.Router()
const jwtMiddle=require('../middleware/jwtMiddleware')
const bookController=require('../Controllers/bookController')

//Registration

router.post('/register',userController.userRegister)




//login

router.post('/login',userController.userLogin)

//google login
router.post('/google-auth',userController.googleLogin)

//Profile Update

router.put('/profile-update',jwtMiddle,multerMiddleware.single('picture'),userController.profileUpdate)


//add book
router.post('/add-book',jwtMiddle,multerMiddleware.array('uploadedImages'),bookController.addBook)





module.exports=router