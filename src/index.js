const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose');
const notesRouter = require('./routes/noteRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()

app.use(cors());

app.use(express.json());
app.use("/users",userRouter);
app.use("/notes",notesRouter);

app.get("/",(req,res)=>{
    res.send("NOTES API's");
})

mongoose.connect(process.env.MONGODB_URI).then(()=>app.listen(process.env.PORT,()=>{
    console.log("Server Started on port no 4000")
})).catch(()=>{
    console.log("Error in Connecting to DB")
})

module.exports = app