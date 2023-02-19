import React from "react";
import './App.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    
    const postToBackend = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:4000/login",{email,password});
        if(response.data==="User does not exist"){
            changeUserDoesNotExist(true);
            changeWrongPassword(false);
        }else if(response.data=="Wrong Password"){
            changeUserDoesNotExist(false);
            changeWrongPassword(true);
        }else{
            localStorage.setItem("jwt",response.data);
            navigate("/logout")
        }
    }
    
    const [userDoesNotExist,changeUserDoesNotExist] = React.useState(false);
    const [wrongPassword,changeWrongPassword] = React.useState(false);
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    
    return (
        <div>
        <form onSubmit={postToBackend}>
        <h1 className="title">Login</h1>

        <div>
            <input 
            id="email"
            type="email"
            onChange={(event)=>{
                setEmail(event.target.value)
            }} 
            placeholder="Email" 
            />
        </div>
        
        <div>
            <input 
            type="password"
            id="password"
            onChange={(event)=>{
                setPassword(event.target.value)
            }} 
            placeholder="Password" 
            />
        </div>

        {userDoesNotExist && 
            <div style={{"margin" : "5px 20px 5px 20px","color":"red"}}>User Doesn't Exist.</div>
        }

        {wrongPassword && 
            <div style={{"margin" : "5px 20px 5px 20px","color":"red"}}>Wrong Password.</div>
        }

        <div style={{"margin" : "5px 20px 5px 20px"}}>
            Register <a href="/signup">here</a>
        </div>
        
        <div>
            <input type="submit" value="Login" />
        </div>

        </form>
        </div>
    );
}

export default Login;
