import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../service/allApi';

function Silo({signup}) {
  const navigate = useNavigate()
  const [userDetails, setUserdetails]= useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userDetails);

  const handleRegister = async ()=>{
    const {username, email, password} = userDetails
    if(!username || !email || !password){
      alert(`Please fill the form`)
    }else{
      const result = await registerAPI(userDetails)
      console.log(result);

      if(result.status==200){
        alert(`Sign up successfull`)
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }else if(result.status == 406){
        alert(result.response.data)
      }else{
        alert(`Something went wrong`)
      }    
    }
  }

  const handleLogin = async ()=>{
    const {email, password} = userDetails
    if(!email || !password){
      alert(`Please fill the form completly`)
    }else{
      //api calls
      const result = await loginAPI({email, password})
      console.log(result);

      if(result.status == 200){
        alert(`Successfully Logged in`)
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
        setTimeout(()=>{
          navigate('/')
        },2000)
        
      }else if(result.status == 406){
        alert(result.response.data)
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
      } else{
        alert(`something went wrong`)
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
      }     
    }
  }
  
  return (
    <>
      <div className='container-fluid' id='loginsignup'>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 mt-lg-5 mt-3">
            <div className='p-lg-5 p-3  mt-lg-5 mt-3 rounded ' style={{ backgroundColor: "rgba(49, 47, 47, 0.61)" }}>
             {!signup? <h1 className='text-light' style={{ fontWeight: "bold" }}>Login in Here</h1>:
              <h1 className='text-light' style={{ fontWeight: "bold" }}>Sign up Here</h1>}

              {signup &&<input value={userDetails.username} onChange={(e)=>setUserdetails({...userDetails, username:e.target.value})} type="text" placeholder='Username' className='form-control p-2 mt-lg-3 mt-2' style={{ borderRadius: "20px" }} />}
              <input value={userDetails.email} onChange={(e)=>setUserdetails({...userDetails, email:e.target.value})} type="email" placeholder='Email id' className='form-control p-2 mt-lg-3 mt-2' style={{ borderRadius: "20px" }} />
              <input value={userDetails.password} onChange={(e)=>setUserdetails({...userDetails, password:e.target.value})} type="password" placeholder='Password' className='form-control p-2  mt-lg-3 mt-2' style={{ borderRadius: "20px" }} />

              {!signup?<button onClick={handleLogin} type='button' className='btn btn-success p-2 w-100  mt-lg-3 mt-2' style={{ borderRadius: "20px" }} >LOGIN</button>:

             <button onClick={handleRegister} type='button' className='btn btn-primary p-2 w-100  mt-lg-3 mt-2' style={{ borderRadius: "20px" }} >SIGN UP</button>}

             
              {signup&&<p className='mt-2 text-white'>Already a user? click here to <Link to={'/login'}>login</Link></p>}


            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  )
}

export default Silo