import React,{useState} from 'react'
import axios from 'axios';

const DBProj= ()=>{
    
    const [user, setUser]=useState({
         email: '',
         username: '',
         gender: 'M',
         age: '', 
         birthDate: '' 
}) 
const registerUser = () => {
    const API_URL = "http://localhost:4000"

    axios.post(`${API_URL}/register-user`, {
        username:user.username,
        email: user.email,
        gender: user.gender,
        birthDate: user.birthDate, 
        age: user.age
        }).then((response)=>{
            console.log(response)
            return response
        }).catch((e)=>console.log(e + 'error was catched')) 
}
    return(
    <div> 
        <div className="register-user-container">
        <h3 className="title"> Welcome to CarCity.com !</h3>
            <h3 className="title"> Register User</h3>
            <div>
                <p>Username</p>
                <input value={user.username} onChange={(e) => {
                setUser({
                    ...user,
                    username: e.target.value
                });
                }} />
            </div>
            <div>
                <p>Email</p>
                <input value={user.email} onChange={(e) => {
                setUser({
                    ...user,
                    email: e.target.value
                });
                }} />
            </div>
            <div onChange= {(e)=>{setUser({...user,gender:e.target.value}) }}>
                <input type="radio" value="M" name="gender" defaultChecked={user.gender === "M"} /> M
                <input type="radio" value="F" name="gender" defaultChecked={user.gender === "F"}/> F
            </div>
            <div>
                <p>Birthdate (DD/MM/YYYY)</p>
                <input value={user.birthDate} onChange={(e) => {
                setUser({
                    ...user,
                    birthDate: e.target.value
                });
                }} />
            </div>
        </div>
        <button onClick={registerUser}>Register User</button>
     </div>
    )
}
export default DBProj