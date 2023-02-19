import React from "react";
import './App.css'
import axios from 'axios'
function App() {

  const postToBackend = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:4000/register",{username,email,password});
    if(response==="User already exists"){
      changeUserExists(true);
    }else{
      localStorage.setItem("jwt",response.data);
    }
    document.getElementById("username").value="";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
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
        <div>User Already Exists.</div>
      }

      <div>
        <input type="submit" value="Submit" />
      </div>

      </form>
    </div>
  );
}

export default App;
