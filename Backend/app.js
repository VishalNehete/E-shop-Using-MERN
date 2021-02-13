//to run on localhost=>library
const express = require('express');
//use the library express (Should be written at starr=ting of the application)
const app = express();
//to use the body-parser=>library
const bodyParser = require('body-parser');
//to log the server requests at console=>library
const morgan=require('morgan');
//to connect to mongodb cloud=>library
const mongoose=require('mongoose');
//let's any other application use the server=>library
const cors=require('cors');
//using cors(before using anything else use cors)
app.use(cors());
//by using * we are allowing all the http requests to be passed from any other origin
app.options('*', cors());
//Used to access the data from .env file
require('dotenv/config');
const api = process.env.API_URL;

//importing routers
const productRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');
const orderRouter = require('./routers/orders');
const userRouter = require('./routers/users');


//Midleware=>all the middleware libraries are being called in this section
//let the backend server understand the json body
app.use(bodyParser.json());
//logs the server requests at console in tiny format
app.use(morgan('tiny'));

//using routers
app.use(`${api}/products`,productRouter);
app.use(`${api}/categories`,categoryRouter);
app.use(`${api}/orders`,orderRouter);
app.use(`${api}/users`,userRouter);


//Connection to mongoDB Atlas 
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...');
})
.catch((err)=>{
    console.log(err);
})


//to make the app listen at port number 3000
app.listen(3000,()=>{
    //console.log(api);
    console.log('server is running http://localhost:3000');
})