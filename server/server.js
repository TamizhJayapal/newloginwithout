const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const mongoose = require('./mongodb/mongoose');
const user = require('./model/user');

const port = process.env.PORT ? process.env.PORT : 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req,res)=>{    
    var newUser = {
        name:req.body.userName,
        email:req.body.userEmail,
        password:req.body.userPass
    }
    var userdata = new user(newUser);
    userdata.saveWithToken().then((x)=>{       
            res.send({token: x.tokens});
        }).catch((e)=>{
            res.status(400).send(e);
    })
}); 

app.post('/login', (req,res)=>{
    let userData = req.body;
    user.findOne({email: userData.email}, (error, user) => {      
        if(!user){
          return res.status(401).send({
            errors: {
                message:'Email does not exist'
            }
        });
        }
        bcrypt.compare(req.body.password, user.password).then(function(data) {            
            if(data){                             
                 res.header("x-auth", user.tokens.token).send({
                     email:user.email,
                     name: user.name,
                     token:user.tokens.token
                 });
            }else {
                 res.status(401).send({
                     errors: {
                         message:'Invalid password'
                     }
                 });
            }
        });        
    });
});

app.listen(port, ()=>{
    console.log('server is running on port', port);
});
