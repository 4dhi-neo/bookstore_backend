const books=require('../Models/bookModel')

//add book:by user

exports.addBook=async(req,res)=>{
    const{title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category}=res.body
    const sellerMail=req.payload?.userMail
    const uploadedImages=req.files.map(item=>item.filename)
    console.log(title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,sellerMail,uploadedImages)
    res.status(200).json("Success")
}




//latest books list:4 latest books

//list books :ignore books added by logined user

//list user added books

//remove book by user:before admin approved it

//view book details :details of a specific book

//get all books: admin

//update book status:admin approval