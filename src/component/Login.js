import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const host ='http://localhost:5000'

const Login = () => {
    const [credentials,setcredentials]=useState({email:"",password:""})
let navigate=useNavigate();

const handlesubmit=async(e)=>{
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/login`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxN2NmNWQ3MjVjYmE5YjQ0NTY5ZjkwIn0sImlhdCI6MTcxMjgzNjQ0NX0.5nhyCjLMKfTBXsDVJ5FQPsKudQElasicykUUTNOCfPE"
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      });
      let json=await response.json()
      console.log(json)
      if(json.success){
        //save the auth token and redirect
localStorage.setItem('token',json.authToken)
navigate("/");
      }else{
        alert("invalid credentials")
      }

}
const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
     <form onSubmit={handlesubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" onChange={onchange}  value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" onChange={onchange} value={credentials.password} className="form-control" id="password" name="password" placeholder="Password"/>
  </div>
  
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
