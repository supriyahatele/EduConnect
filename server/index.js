const express = require('express');
const { connectionToDB } = require('./config/dbConfig');
const {userRouter} = require('./routes/user.router')
const app = express();
require('dotenv').config()
app.use(express.json())
app.get('/', (req,res) => {
    res.status(200).json({message : 'hello world'})
})

app.use('/users',userRouter)
app.listen(process.env.PORT, async() => {
    try{
    console.log(`listening on port ${3000}`);
    await connectionToDB();
    }catch(err){
        console.log(err);
    }
})
