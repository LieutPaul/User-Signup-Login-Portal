import React from "react";
import './App.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate=useNavigate();
    
    const postToBackend = async (event) => {
        event.preventDefault();
        const response = await axios.post("http://localhost:4000/register",{username,email,password});
        if(response.data==="User already exists"){
          changeUserExists(true);
        }else{
          localStorage.setItem("jwt",response.data);
          navigate("/logout")
        }
    }

    const [userExists,changeUserExists] = React.useState(false);
    const [username,setUsername] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    
    return (
      <div>
      <form onSubmit={postToBackend}>
        <h1 className="title">Register</h1>
        <div>
          <input 
            id="username"
            onChange={(event)=>{
              setUsername(event.target.value)
            }} 
            placeholder="Username" 
          />
        </div>
        
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

        {userExists && 
          <div style={{"margin" : "5px 20px 5px 20px","color":"red"}}>User Already Exists.</div>
        }
        
        <div style={{"margin" : "5px 20px 5px 20px"}}>
          Login <a href="/login">here</a>
        </div>
        
        <div>
          <input type="submit" value="Submit" />
        </div>

      </form>
      </div>
    );
}

export default Register;
