const express = require('express')
const morgan = require("morgan")
const dotenv = require('dotenv');
const MySqlPool = require('./config/db');
const route= require('./routes/bestieRouter')
dotenv.config();
//REST object
const app = express();

//middlewears
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/",route)

//port
const PORT = process.env.PORT||8080;
//listening conditional
MySqlPool.query('SELECT 1').then(()=>{
    console.log('MySQL Connected')

    app.listen(PORT,()=>{
        console.log(`Server Running  on port ${PORT} `);
        })
}).catch((error)=>{
    console.log(error);
})

