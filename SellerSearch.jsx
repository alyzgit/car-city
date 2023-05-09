import React,{useState} from 'react'
import axios from 'axios';

const SellerSearch= ()=>{
    const [Seller, setSeller]=useState({
         FName: '',
         LName: '',
})
    const [car, setCar]=useState({
    carMake: ''
}) 
let [carsFound, setCarsFound] = useState([])

let [SellersFound, setSellersFound] = useState([])

const SearchSeller = () => {
    const API_URL = "http://localhost:4000"

    axios.post(`${API_URL}/cars-by-sellername`,{
        FName:Seller.FName,
        LName:Seller.LName

        }).then((response)=>{
            console.log(response)
            setSellersFound(response.data)
            setCarsFound(response.data)
            return response
        }).catch((e)=>console.log(e + 'error was catched')) 
}
    return(
    <div> 
        <div className="Seller-container">
            <h3 className="title">Show all the properties listed by a specific owner (given their first and last name</h3>
            <div>
                <p>Seller First Name</p>
                <input value={Seller.FName} onChange={(e) => {
                setSeller({
                    ...Seller,
                    FName: e.target.value
                });
                }} />
            </div>
            <div>
                <p>Seller Last Name</p>
                <input value={Seller.LName} onChange={(e) => {
                setSeller({
                    ...Seller,
                    LName: e.target.value
                });
                }} />
            </div>
        </div>
        <button onClick={SearchSeller}>Search Seller</button>
        {SellersFound.length > 0 ? <div className="car-container" >
             <h3 style={{textDecoration: 'underline'}} >Sellers Count: {SellersFound.length}</h3>
             {/* {SellersFound.map((Seller,car, i)=>{
                 return <div key={i} >
                     <h4> Seller {i+1} </h4>
                    <p>Seller Name: <span> <b>{Seller.S_Name} </b></span></p>
                    <p>Ad Link: <span> <b>{car.Ad_id} </b></span></p>
                    <p>Car Make: <span> <b>{car.Brand} </b></span></p>
                    <p>Car Brand: <span> <b>{car.Model} </b></span></p>
                    <p>Seller Link:<span> <b>{Seller.pk_link} </b></span></p>

                    <div className="line"></div>
                 </div>
             })} */}
            {carsFound.map((car, i)=>{
                 return <div key={i} >
                     <h4> Car {i+1} </h4>
                    <p>Car id: <span> <b>{car.Ad_id}</b></span></p>

                    <p>Car Seller: <span> <b>{car.S_ID} </b></span></p>

                    <div className="line"></div>
                 </div>
             })}
         </div>  : null}
     </div>
    )
}
export default SellerSearch