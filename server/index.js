const express = require('express');
const { connectionToDB } = require('./config/dbConfig');
const app = express();
require('dotenv').config()

app.listen(process.env.PORT, async() => {
    try{
    console.log(`listening on port ${3000}`);
    await connectionToDB();
    }catch(err){
        console.log(err);
    }
})
