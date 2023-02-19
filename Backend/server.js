require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt');
const cors=require('cors');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/userAuthenticationDB",{useNewURLParser:true});

const UserSchema = new mongoose.Schema({
    email : String,
    username : String,
    password : String,
});

const User = mongoose.model("User",UserSchema);

function authenticateToken(req,res,next) { //MiddleWare to check if JWT is valid
    //Header - Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    req.token=token
    if(token=="null"){
        return res.send(false);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err){
            res.send(false); //Invalid Token => No Access
        }
        req.user = user;
        next();
    })
}

app.get('/user', authenticateToken, (req, res) => {
    res.send(req.user);
});

// API Route to create a user
app.post('/register', async (req, res) => {
    // Adding user to list of users
    const hashedPassword = await bcrypt.hash(req.body.password,10) //Hashing the password with 10 salt rounds
    const user = new User({ 
        email: req.body.email, 
        username:req.body.username, 
        password: hashedPassword 
    });
    User.find({username:req.body.username},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length !== 0){
                res.send('User already exists');
            }else{
                user.save((err, result) => {
                    if(err){
                        console.log(err);
                        res.send('User already exists');
                    }else{
                        jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,(err,token)=>{
                            res.send(token);
                        })
                    }
                });
            }
        }
    })
    
});

// API Route to try to login a user
app.post('/login', async (req, res) => {
    console.log(req.body.email)
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log(err);
        }else{
            if(user){ //Comparing passwords
                bcrypt.compare(req.body.password, user.password, (err, data) => {
                    if(err){
                        console.log(err);
                    }
                    if(data){
                        const token = jwt.sign({
                            name: data.name,
                            username : data.username
                        }, process.env.ACCESS_TOKEN_SECRET, (err,token)=>{
                            res.send(token);
                        });
                    }else{
                        return res.send("Wrong Password")
                    }
                });
            }else{
                res.send("User does not exist")
            }
        }
    })
    
});

app.listen(4000, ()=>{
    console.log("Listening on port 4000.")
})