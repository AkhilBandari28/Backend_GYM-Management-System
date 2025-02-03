const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const bodyParser = require('body-parser')
const billingRoutes = require('./routes/billingRoutes')
const memberRoutes = require('./routes/memberRoutes')
const reportRoutes = require('./routes/reportRoutes')
const app = express()

const PORT = 4000;

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("MongoDB connected successfully!!");})
.catch((err)=>{console.log("Error connecting to MongoDB", err);})

app.use(bodyParser.json())
app.use('/User', authRoutes)
app.use('/billing', billingRoutes)
app.use('/member', memberRoutes)
app.use('report', reportRoutes)

app.listen(PORT, ()=> {
    console.log(`Server started and running at ${PORT}`);
})

app.use('/home', (req,res)=> {
    res.send("<h1> Welcome to GYM Managaement")
})