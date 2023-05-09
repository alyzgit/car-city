import React,{useState} from 'react'
import axios from 'axios';

const Get= ()=>{
    const [car, setCar]=useState({
         carMake: '',
         bodyType: '',
         location: '',
}) 
    let [carsFound, setCarsFound] = useState([])
const getcars = () => {
    const API_URL = "http://localhost:4000"

    axios.post(`${API_URL}/cars-filter-1`, {
        carMake: car.carMake,
        bodyType: car.bodyType,
        location: car.location, 
        }).then((response)=>{
            console.log(response)
            setCarsFound(response.data)
            return response
        }).catch((e)=>console.log(e + 'error was catched')) 
}
    return(
    
     <div>
         <div className="Searchbybrandlocation-container"> 
         <h3 className="title">Show all the ads for a given car make, body type and year in a specific location / area, along with the average price the number of listings for each model</h3>
            <div>
                <p>carMake</p>
                <input value={car.carMake} onChange={(e) => {
                setCar({
                    ...car,
                    carMake: e.target.value
                });
                }} />
            </div>
            <div>
                <p>bodyType</p>
                <input value={car.bodyType} onChange={(e) => {
                setCar({
                    ...car,
                    bodyType: e.target.value
                });
                }} />
            </div>
            <div>
                <p>location</p>
                <input value={car.location} onChange={(e) => {
                setCar({
                    ...car,
                    location: e.target.value
                });
                }} />
            </div> 
         </div>
         <button onClick={getcars}>Search</button>
         {carsFound.length > 0 ? <div className="car-container" >
             <h3 style={{textDecoration: 'underline'}} >Cars Count: {carsFound.length}</h3>
             {carsFound.map((car, i)=>{
                 return <div key={i} >
                     <h4> Car {i+1} </h4>
                    <p>Car Link: <span> <b>{car.Ad_id}</b></span></p>
                    <p>Car Ad: <span><b>{car.Ad_type} </b> </span></p>
                    <p>Car Body Type: <span> <b>{car.Body_Type} </b></span></p>

                    <div className="line"></div>
                 </div>
             })}
         </div>  : null}
     </div>

    )
}
export default Get