const express= require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./api/routes/user.js');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://guest:'+ process.env.MONGO_ATLAS_PW + '@atlascluster.chf5ib4.mongodb.net/?retryWrites=true&w=majority' 
)
mongoose.Promise = global.Promise;

mongoose.connection.on('error', err => {
    logError(err);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);

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