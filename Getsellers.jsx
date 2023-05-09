import React,{useState} from 'react'
import axios from 'axios';

const GetSellers= ()=>{
    
    let [SellersFound, setSellersFound] = useState([])
const getSellers = () => {
    const API_URL = "http://localhost:4000"

    axios.get(`${API_URL}/top-5-Sellers-sortby-carscount`).then((response)=>{
            console.log(response)
            setSellersFound(response.data)
            return response
        }).catch((e)=>console.log(e + 'error was catched')) 
}
    return(
    
     <div>
         <div className="top-5-sellers"> 
         <h3 className="title">Show the top 5 sellers by the amount of listings they have, along with their avg price per year</h3>
            <div>
                <p> Top 5 Sellers by Inventory, along with Average Price</p>
            </div>
         </div>
         <button onClick={getSellers}>Search</button>
         {SellersFound.length > 0 ? <div className="car-container" >
             <h3 style={{textDecoration: 'underline'}} >Sellers Count: {SellersFound.length}</h3>
             {SellersFound.map((Seller, i)=>{
                 return <div key={i} >
                     <h4> Seller {i+1} </h4>
                    <p>Seller Name: <span> <b>{Seller.S_Name} </b></span></p>
                    <p>Count: <span> <b>{Seller.carsCountForSeller} </b></span></p>
                    <p>Average Price for cars of seller:<span> <b>{Seller.Averageprice} EGP</b></span></p>

                    <div className="line"></div>
                 </div>
             })}
         </div>  : null}
     </div>

    )
}
export default GetSellers