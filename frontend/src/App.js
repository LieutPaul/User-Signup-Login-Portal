import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function App() {
    const navigate = useNavigate();
    React.useEffect(()=>{
        async function fetchData(){
            const response = await axios.get("http://localhost:4000/user",{
                headers:{
                    'Authorization' : "Bearer " + localStorage.getItem("jwt")
                }
            })
            if(response.data===false){
              //Not signed in
              navigate("/signup")
            }else{
              navigate("/logout")
            }
        }
        fetchData();
        
    },[])
  return (
    <div>
    </div>
  )
}
