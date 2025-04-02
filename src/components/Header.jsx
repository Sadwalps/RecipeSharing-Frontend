import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { loginResponseContext } from '../context/ContextShare';

function Header() {

  const {setLoginResponse} = useContext(loginResponseContext)
  const [ token, setToken] = useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  })

const handleLogout = ()=>{
  alert(`Logging Out`)
  sessionStorage.removeItem("existingUser")
  sessionStorage.removeItem("token")
  setLoginResponse(false)
  navigate('/')
}




 
  return (
    <>
     <div>
     <Navbar className="bg-dark" >
        <Container className="d-flex justify-content-between">
          <Link to={'/'} >
            <img
              src="https://cdn-icons-png.freepik.com/512/10840/10840480.png"
              width="45"
              height="45"
              className="d-inline-block align-top m-1"
              alt="Websitelogo"
            />
          </Link>
          {token &&<div onClick={handleLogout} id='logoutdiv'>
          <FontAwesomeIcon icon={faPowerOff} />
          </div>}
        </Container>
      </Navbar>
     </div>
    </>
  )
}

export default Header