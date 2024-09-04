import axios from "axios"
import { useState, useEffect } from "react";

function AllUsers(){
    const [getAllUsers, setGetAllUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users").then((response)=>{
            setGetAllUsers(response.data);
         
          console.log(response.data);
        }).catch((error)=>{
          console.log("this is Error",error);
        })
      }, []);

    return(
        <> 
           {Array.isArray(getAllUsers) && getAllUsers.map((list, index) => (
            <div key={index} id={list.id} className="w3-card-4 w3-dark-grey" style={{position:"relative", padding:"2%", width:"20%", height:"25%", borderRadius:"7%", textAlign:"center"}}>
                <div className="w3-container w3-center">
                <h3>{list.title}</h3>
                <p>User ID: {list.id}</p>
                <p>Genre: {list.genre}</p>
                <p>Year: {list.year}</p>
                <button className="w3-button w3-green">Accept</button>
                <button className="w3-button w3-red">Decline</button>
                </div>
            </div>
            ))}
        </>
    )
}
export default AllUsers