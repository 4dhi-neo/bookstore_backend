const mongoose=require('mongoose')

const connection_string=process.env.CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log("Server Connected with MongoDB Server")
}).catch((err)=>{
    console.log("MogoDB server Connection Failed")
    console.log(err)
})