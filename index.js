//Loads .env file contents into process.env by default

require('dotenv').config()
const express=require("express")
const cors=require("cors")
const router=require('./Routes/routes')
require('./Dbconnect/db')

//creating server instance
const server=express()
//enabling cors in server
server.use(cors())
//enabling middleware(parse Json req body)
server.use(express.json())
//Configuring router
server.use(router)
//configuring static middleware for  sering static files to clientside
server.use('/uploads',express.static('uploads'))


//setting up port number in server
const port=process.env.PORT
//start server to listen client requests to that port/available server in internet
server.listen(port,()=>{
    console.log(`server started at ${port} & waiting for client request!`)
})
// //resolving API(http://localhost/3000 get request) using express
// server.get('/',(req,res)=>{
//     res.send("<h1>Server is Running ! waiting for client requests!!</h1>")
// })

// //resolving API(http://localhost/3000/addbook post request) using express
// server.post('/addbook',(req,res)=>{
//     res.send("POST HIT")
// })

// server.get('/getbook',(req,res)=>{
//     res.status(201).json({"title":"aadujeevitham","price":120,"author":"benymin"})
// })

// server.delete('/deletebook',(req,res)=>{
//     res.status(200).json({"msg":"Deleted"})
// })


//handling global errors using application level middlewares

server.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json(err)
})

