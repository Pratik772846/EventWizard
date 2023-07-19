const express= require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const userRoutes = require('./api/routes/user.js');
const eventRoutes = require('./api/routes/events.js');
const tokenRoutes =require("./api/routes/tokens.js");
const inviteRoutes = require('./api/routes/invites.js');
const expenseRoutes = require('./api/routes/expense.js');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://guest:'+ process.env.MONGO_ATLAS_PW + '@atlascluster.chf5ib4.mongodb.net/?retryWrites=true&w=majority' 
)
mongoose.Promise = global.Promise;


app.use(cors());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());



app.use((req,res,next)=>{
    // res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    res.header('Access-Control-Allow-Credentials',true);
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);
app.get('/',(req,res)=>{ 
    res.send("hello");
})

app.use('/events', eventRoutes);
app.use("/tokens",tokenRoutes);
app.use("/invites",inviteRoutes);
app.use("/expense",expenseRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

module.exports = app;