import React,{useState} from 'react'
import axios from 'axios';

const GetAreas= ()=>{
    const [car, setCar]=useState({
         carMake: '',
}) 
    let [areasFound, setareasFound] = useState([])
const getAreas = () => {
    const API_URL = "http://localhost:4000"

    axios.post(`${API_URL}/top-5-areas-sortby-carscount-by-make`, {
        make: car.carMake
        }).then((response)=>{
            console.log(response)
            setareasFound(response.data)
            return response
        }).catch((e)=>console.log(e + 'error was catched')) 
}
    return(
    
     <div>
         <div className="Searchbybrandlocation-container"> 
         <h3 className="title">Show the top 5 areas in cairo by amount of inventory and average price a given make / model</h3>
            <div>
                <p> Enter Car Make</p>
                <input value={car.carMake} onChange={(e) => {
                setCar({
                    ...car,
                    carMake: e.target.value
                });
                }} />
            </div>
         </div>
         <button onClick={getAreas}>Search</button>
         {areasFound.length > 0 ? <div className="car-container" >
             <h3 style={{textDecoration: 'underline'}} >Areas Count: {areasFound.length}</h3>
             {areasFound.map((area, i)=>{
                 return <div key={i} >
                     <h4> Area {i+1} </h4>
                    <p>Area: <span> <b>{area.Location} </b></span></p>
                    <p>Car Make: <span> <b>{area.Brand} </b></span></p>
                    <p>Cars Count: <span> <b>{area.carsCountForLocationAndBrand} </b></span></p>

                    <div className="line"></div>
                 </div>
             })}
         </div>  : null}
     </div>

    )
}
export default GetAreas