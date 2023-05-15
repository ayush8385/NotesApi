const express = require('express');
const app = express();
const userRouter = require('./src/routes/userRoutes');
const mongoose = require('mongoose');
const notesRouter = require('./src/routes/noteRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
const connect = async () =>{
    var db = await mongoose.connect('mongodb+srv://ayush8385:Ayush8385@notes.tk6z9sp.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log("connnected to DBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")).catch(()=>{
        console.log("Error in Connecting to DB")
    })
}


app.use(cors());
connect();

app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",notesRouter);

app.get("/",(req,res)=>{
    res.status(200).json({
        status: 'success'
    });
})
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("Server Started on port no"+PORT)
})



module.exports = app