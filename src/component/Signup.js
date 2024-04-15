import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const host ='http://localhost:5000'

const Signup = (props) => {
    const [credentials,setcredentials]=useState({name:"",email:"",password:""})
let navigate=useNavigate();

const handlesubmit=async(e)=>{
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxN2NmNWQ3MjVjYmE5YjQ0NTY5ZjkwIn0sImlhdCI6MTcxMjgzNjQ0NX0.5nhyCjLMKfTBXsDVJ5FQPsKudQElasicykUUTNOCfPE"
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
      let json=await response.json()
      console.log(json)
      if(json.authToken){
        //save the auth token and redirect
localStorage.setItem('token',json.authToken)
navigate("/login");
props.showAlert("Account created successfullly","success")
      }else{
        // alert("choose the correct password")
        props.showAlert("Invalid credential","danger")
      }

}
const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container '>
     <form onSubmit={handlesubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">name</label>
    <input type="text" onChange={onchange}  value={credentials.name} className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter name"/>
    <small id="emailHelp" className="form-text text-muted">enter a namee</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" onChange={onchange}  value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group ">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" onChange={onchange} minLength={5} required value={credentials.password} className="form-control" id="password" name="password" placeholder="Password"/>
  </div>
  
  
  <button type="submit"  className="btn btn-primary my-3">Submit</button>
</form>
    </div>
  )
}

export default Signup
