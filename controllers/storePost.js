const Post = require('../database/models/Post');
const path= require('path');
const cloudinary= require('cloudinary');

module.exports= (req,res) => {

  const {image} = req.files

  const uploadPath=path.resolve(__dirname,'..', 'public/posts',image.name);

  image.mv(uploadPath,(err)=>{

    cloudinary.v2.uploader.upload(uploadPath,(err,result)=>{

      if(err){
        return res.redirect('/')
      }

      Post.create({
        ...req.body,
        image:result.secure_url,
        author:req.session.userId
      },(err, post)=>{

        console.log(post)
        res.redirect('/')
      });

    });
   
  });

}