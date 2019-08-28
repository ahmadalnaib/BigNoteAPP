require('dotenv').config();

const express= require('express');
const path= require('path');
const expressEdge= require('express-edge');
const connectDB=require('./config/db');
const bodyParser= require('body-parser');
const fileUpload=require('express-fileupload');
const expressSession = require('express-session');
const connectMongo= require('connect-mongo');
const mongoose= require('mongoose');
const connectFlash = require('connect-flash');
const edge = require('edge.js');
const cloudinary= require('cloudinary');

//controller//

const createPostController= require('./controllers/createPost');
const homePageController= require('./controllers/homePage');
const storePostController= require('./controllers/storePost');
const getPostController= require('./controllers/getPost');
const createUserController= require('./controllers/createUser');
const storeUserController= require('./controllers/storeUser');
const loginController= require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController= require('./controllers/logoutController');



const app = express();
connectDB();

cloudinary.config({
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  cloud_name:process.env.CLOUDINARY_NAME,


})


const mongoStore = connectMongo(expressSession);


app.use(expressSession({
  secret:process.env.EXPRESS_SESSION_KEY,

  store:new mongoStore({
    mongooseConnection: mongoose.connection
  })
}))

//connect data

connectDB();


app.use(connectFlash());
app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);

app.set('views',`${__dirname}/views`);

app.use('*',(req,res,next) =>{
  edge.global('auth',req.session.userId)

  next()
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//middleware//
const storePost= require('./middleware/storePost');

const auth= require('./middleware/auth');


const redirectifAuthenticated = require('./middleware/redirectifAuthenticated');




//route

app.get("/",homePageController);

app.get('/posts/new',auth,createPostController);

app.post('/posts/store',auth,storePost,storePostController);

app.get("/post/:id",getPostController);

app.get('/auth/register',  redirectifAuthenticated,createUserController);

app.get('/', createUserController);

app.post('/users/register',  redirectifAuthenticated,storeUserController);

app.get('/auth/login', redirectifAuthenticated,loginController);

app.get('/auth/logout',  auth,logoutController);

app.post('/users/login', redirectifAuthenticated,loginUserController);

app.use((req,res) =>{
  res.render('not-found')
})



let port = process.env.PORT
if(port===null || port==""){
port=3000
}


app.listen(port)