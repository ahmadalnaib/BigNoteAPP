const mongoose = require('mongoose');
const  Post = require('./database/models/Post');
const connectDB=require('./config/db');




connectDB();


//create data///

// Post.create({
//   title:'My first blog post',
//   description:'Blog post description',
//   content:'ahmed mohamedf habeeb'
// },(error,post)=>{

//   console.log(error,post)
// })



//read data//

Post.find({

},(err,posts)=>{
console.log(err,posts)
})