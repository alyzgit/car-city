import React,{useState} from 'react'
import axios from 'axios';

const Topcars= ()=>{
    console.log("element called")
    let [MakesFound, setMakesFound] = useState([])
const getCars = () => {
    const API_URL = "http://localhost:4000"
    console.log("function called")
    axios.get(`${API_URL}/top-5-cars-by-make`).then((response)=>{
            console.log(response)
            setMakesFound(response.data)
            console.log("API called")
            return response
        }).catch((e)=>console.log(e + 'error was catched')) 
}
    return(
    
     <div>
         <div className="top-5-makes"> 
         <h3 className="title">Show the top 5 sellers by the amount of listings they have, along with their avg price per year</h3>
            <div>
                <p> Top 5 Makes by Inventory, along with Average Price</p>
            </div>
         </div>
         <button onClick={getCars}>Search</button>
         {MakesFound.length > 0 ? <div className="car-container" >
             <h3 style={{textDecoration: 'underline'}} >Makes Count: {MakesFound.length}</h3>
             {MakesFound.map((MakesFound, i)=>{
                 return <div key={i} >
                     <h4> car make  {i+1} </h4>
                    <p>Cars Name: <span> <b>{MakesFound.Brand} </b></span></p>
                    <p>Count: <span> <b>{MakesFound.carCount} </b></span></p>
                    <p>Average Price for Cars:<span> <b>{MakesFound.carsCount_For_Brand_and_average_price} EGP</b></span></p>

                    <div className="line"></div>
                 </div>
             })}
         </div>  : null}
     </div>

    )
}
export default Topcars