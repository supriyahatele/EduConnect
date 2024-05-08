const express = require('express');
const { connectionToDB } = require('./config/dbConfig');
const cors = require("cors");
const { quizRouter } = require('./routes/quize.route');
const app = express();
require('dotenv').config()

app.use(express.json());
app.use(cors());

app.use("/quiz",quizRouter);

app.listen(process.env.PORT, async() => {
    try{
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectionToDB();
    }catch(err){
        console.log(err);
    }
})
