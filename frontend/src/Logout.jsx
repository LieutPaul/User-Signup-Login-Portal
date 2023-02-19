import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Logout() {

  const [user,changeUser] = React.useState({});
  
  const navigate = useNavigate();

    React.useEffect(()=>{
        async function fetchData(){
            const response = await axios.get("http://localhost:4000/user",{
                headers:{
                    'Authorization' : "Bearer " + localStorage.getItem("jwt")
                }
            })
            if(response.data===false){
              navigate("/")
            }
            changeUser(response.data.user)
        }
        fetchData();
    },[])

  return (
    <div>
      <div>
        Username - {user.username}
      </div>
      <div>
        Email - {user.email}
      </div>
      <button onClick={()=>{
        localStorage.removeItem("jwt")
        navigate("/")
      }}>Logout</button>
    </div>
  )
}
