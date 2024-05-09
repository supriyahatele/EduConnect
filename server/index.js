const express = require('express');
const { connectionToDB } = require('./config/dbConfig');
const {userRouter} = require('./routes/user.router')
const cors = require("cors");
const { quizRouter } = require('./routes/quize.route');
const app = express();
require('dotenv').config()
app.use(express.json())

app.use(cors());

app.get('/', (req,res) => {
    res.status(200).json({message : 'hello world'})
})

app.use("/quiz",quizRouter);
app.use('/users',userRouter)

app.listen(process.env.PORT, async() => {
    try{
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectionToDB();
    }catch(err){
        console.log(err);
    }
})
