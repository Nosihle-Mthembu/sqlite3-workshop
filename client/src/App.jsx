import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";
import AllUsers from './component/getAllUsers';

function App() {
  const [storeData, setStoreData] = useState({});
  
  useEffect(() => {
    
    axios.get("http://localhost:5000/").then((response)=>{
      setStoreData(response.data);
     
      console.log(response.data);
    }).catch((error)=>{
      console.log("this is Error",error);
    })
  }, []);
  return (
    <>
      <h1>
       Title : {storeData.title}
      </h1>
      <AllUsers/>
    </>
  )
}
export default App
