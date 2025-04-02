import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { getAllRecipesAPI  } from '../service/allApi'
import { serverURL } from '../service/serverUrl'
import Header from '../components/Header'


function Allrecipe() {
  const [token, setToken] = useState("")
  const [allRecipes, setAllRecipes] = useState([])

  const [searchKey, setSearchKey] = useState("")

 
  const getAllRecipes = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllRecipesAPI(searchKey, reqHeader)
      setAllRecipes(result.data);
      
    }
  }
  console.log(allRecipes);
  console.log(searchKey);


  useEffect(()=>{
    getAllRecipes()
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[searchKey])


  return (
    <>
    <Header />

      <div id='Allrecipe' >
        <div className='container-fluid'>
          <div className="row pt-lg-4 pt-3 ">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex flex-column justify-content-center align-items-center pt-lg-4 pt-3">
              <div className=' bg-light text-dark d-flex justify-content-center align-items-center px-5 py-5' style={{ borderRadius: "50%", fontWeight: "bold", fontSize: "20px" }}>
                RECI
              </div>
              <h1 className='mainhead'>Search your favourite recipe here</h1>
              
            </div>
            <div className="col-md-2"></div>
          </div>
          {/* <div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 p-4">
               <div className=' text-center '>
                <select onChange={(e)=>setSearchKey(e.target.value)}  name="" id="" style={{backgroundColor:"white", border:"0px", borderRadius:"15px", fontWeight:"bold"}} className='p-2 w-100 text-center'>
                  <option value="" hidden style={{fontWeight:"bold"}}>Select Category</option>
                  <option value="Vegitarian" style={{fontWeight:"bold"}}>Vegitarian</option>
                  <option value="Non Vegitarian" style={{fontWeight:"bold"}}>Non Vegitarian</option>
                  <option value="Drinks" style={{fontWeight:"bold"}}>Drinks</option>
                  <option value="Deserts" style={{fontWeight:"bold"}}>Deserts</option>
                  <option value="Snacks" style={{fontWeight:"bold"}}>Snacks</option>
                  
                </select>
               </div>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div> */}
          <div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 p-3">
                <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='form-control w-md-50   mt-lg-2  text-center' style={{ borderRadius: "15px" }} placeholder='Search' />
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
      </div>

      
     {token? <div>

        {
          allRecipes?.map((item)=>(<div className='mt-3 mb-3' id='homerecipelargescreen'>
            <div className='container-fluid'>
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4 p-lg-1 p-2">
                  <img src={`${serverURL}/upload/${item?.recipeImage}`} alt="" className='w-100' style={{ height: "340px" }} />
                </div>
                <div className="col-md-4 ps-lg-5 ps-1 d-flex flex-column justify-content-center ">
                  <h1 style={{ fontWeight: "bold" }}>{item?.recipename}</h1>
                  <h5 className='mt-lg-2 mt-1'><FontAwesomeIcon icon={faClock} /> {item?.time}</h5>
                  <p className='mt-lg-2 mt-1'><span style={{fontWeight:"bold"}}>Incredients</span> {item?.incredients}</p>
                  <h5>{item?.category}</h5>
                </div>
                <div className="col-md-2"></div>
              </div>
    
            </div>
            
            

      

        
   
      </div>))}


     
      {allRecipes?.map((item)=>(<div id='homerecipesmallscreen'>
        <div className='container-fluid'>
          <div className="row p-2">
            <div className="col-md-2"></div>
            <div className="col-md-4  p-2">
              <img src={`${serverURL}/upload/${item?.recipeImage}`} alt="" className='w-100' style={{ height: "250px" }} />
            </div>
            <div className="col-md-4 ps-lg-5 ps-1 d-flex flex-column justify-content-center ">
              <h1 style={{ fontWeight: "bold" }}>{item?.recipename}</h1>
              <h5 className=' mt-1'><FontAwesomeIcon icon={faClock} /> {item?.time}</h5>
              <p className='mt-1'><span style={{fontWeight:"bold"}}>Incredients</span> {item?.incredients}</p>
              <h5>{item?.category}</h5>

            </div>
            <div className="col-md-2"></div>
          </div>

        </div>
        
        

      </div>))}
      </div>:

      <div className='container-fluid ' style={{height:"65vh"}}>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6  text-info mt-5 pt-5  d-flex flex-column justify-content-center align-items-center">
            <img src="https://www.creativefabrica.com/wp-content/uploads/2023/10/26/Empty-meal-tray-Cartoon-kicthen-contain-Graphics-82559752-1.png" alt="" style={{height:"200px"}} />
           <h1 className='text-center ' style={{fontWeight:"bold"}}>No Recipe Added In this Category!!!</h1> 
          </div>
          <div className="col-3"></div>
        </div>
      </div>}

    </>
  )
}

export default Allrecipe