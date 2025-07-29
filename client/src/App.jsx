import { useState, useEffect } from "react";
import axios from 'axios';
import Register from "./pages/Register";
import './index.css';

function App() {

  const[message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('http://localhost:5000/api/test')
      .then(response => {
        setMessage(response.data.message)
      })
      .catch(error => {
        console.log("There was an error in fetching data", error)
        setMessage("Could not connect to the server. Is it running?")
      });
  },[])

  return (
    <div>
      <Register/>
    </div>
  )
}

export default App;