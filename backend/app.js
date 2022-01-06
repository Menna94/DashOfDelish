//DOTENV
require('dotenv').config()
//IMPORTS 
const express = require('express');
const app = express();
const path = require('path');
//Routes
const RecipeRoutes = require('./Routes/recipe.routes');
const AuthRoutes= require('./Routes/auth.routes');


//DATABASE
const dbConnection = require('./config/db');
dbConnection();

//body parser
app.use(express.json());

//serve static folder
app.use('/images', express.static(path.join('backend/images')));

// console.log(process.env.JWT_EXPIRES_IN);

//cors
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader(
        'Access-Control-Allow-Methods',
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    )
    next()
})


//mount routers
app.use("/api/recipes", RecipeRoutes)
app.use("/api/auth", AuthRoutes)

module.exports = app;