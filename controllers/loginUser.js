const User= require('../database/models/User');
const bcrypt =require('bcrypt');


module.exports= (req,res) =>{

  const {email, password} =req.body;


User.findOne({email},(err,user) =>{

  if (user){
    bcrypt.compare(password, user.password,(err,same) =>{

      if(same){

        req.session.userId=user._id

        res.redirect('/')
      }else {
        res.redirect('/auth/login')
      }
      

    })

  } else {
    return res.redirect('/auth/login')
  }
})




}