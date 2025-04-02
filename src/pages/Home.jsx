
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getHomeRecipeAPI, submitRecipeAPI } from '../service/allApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { serverURL } from '../service/serverUrl';
import Header from '../components/Header';




function Home() {

  const [homeRecipes, SetHomeRecipes] = useState([])


  const [preview, setPreview] = useState("")
  console.log(preview);

  const [show, setShow] = useState(false);
  const [token, setToken] = useState("")

  const [key, setKey] = useState(1)

  const getHomeRecipes = async ()=>{
    const result = await getHomeRecipeAPI()
    SetHomeRecipes(result.data)
    
  }
  console.log(homeRecipes);
  

  const handleClose = () => {
    setShow(false);
    handleCancel()
  }
  const handleShow = () => setShow(true);
  const [recipeDetails, setRecipeDetails] = useState({
    recipename: "",
    time: "",
    incredients: "",
    category: "",
    recipeImage: ""
  })
  console.log(recipeDetails);


  const [isLogin, setIsLogin] = useState(false)



  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setRecipeDetails({ ...recipeDetails, recipeImage: e.target.files[0] })

  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  })

  useEffect(() => {
    if (recipeDetails.recipeImage) {
      setPreview(URL.createObjectURL(recipeDetails.recipeImage))
    }
  }, [recipeDetails.recipeImage])

  const handleCancel = () => {
    setRecipeDetails({
      recipename: "",
      time: "",
      incredients: "",
      category: "",
      recipeImage: ""
    })
    setPreview("")
    if(key == 1){
      setKey(0)
    }else{
      setKey(1)
    }
  }

  const handleSubmit = async () => {
    const { recipename, time, incredients, category, recipeImage } = recipeDetails
    if (!recipename || !time || !incredients || !category) {
      alert(`Fill the form Completly`)

    } else {
      const reqBody = new FormData()
      reqBody.append("recipename", recipename)
      reqBody.append("time", time)
      reqBody.append("incredients", incredients)
      reqBody.append("category", category)
      reqBody.append("recipeImage", recipeImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await submitRecipeAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          alert(`Recipe added Successfully `)
          setTimeout(()=>{
            handleClose()
          },2000)
        } else if (result.status == 406) {
          alert(result.response.data)

        } else {
          alert(`Something went wrong`)
        }
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  useEffect(()=>{
    getHomeRecipes()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])


  return (
    <>
    
      {/* before login */}
      {isLogin == false ? <div id='home' >
        <div className='container-fluid'>
          <div className="row pt-lg-5 pt-4 ">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex flex-column justify-content-center align-items-center pt-lg-4 pt-3">
              <div className=' bg-light text-dark d-flex justify-content-center align-items-center px-5 py-5' style={{ borderRadius: "50%", fontWeight: "bold", fontSize: "20px" }}>
                RECI
              </div>
              <h1 className='mainhead'>Enjoy Cooking</h1>
              <h3 className='text-light ps-lg-1 ps-2' style={{ fontWeight: "bold" }}>A recipe is a story that ends with a good meal </h3>
              <Link to={'/register'}><button className='btn btn-info px-lg-5 px-4 py-lg-2 py-2  mt-3 fs-lg-4 fs-5' style={{ borderRadius: "25px", fontWeight: "bold" }}>Start Browsing</button></Link>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div> :

        <div id='home2' >
          <Header />
          <div className='container-fluid'>
            <div className="row pt-lg-5 pt-4 ">
              <div className="col-md-2"></div>
              <div className="col-md-8 d-flex flex-column justify-content-center align-items-center pt-lg-4 pt-3">
                <div className=' bg-light text-dark d-flex justify-content-center align-items-center px-5 py-5' style={{ borderRadius: "50%", fontWeight: "bold", fontSize: "20px" }}>
                  RECI
                </div>
                <h1 className='mainhead'>Submit recipes</h1>
                <h3 className='text-light ps-lg-1 ps-2' style={{ fontWeight: "bold" }}>Easily share your own recipe on our website </h3>
                <button onClick={handleShow} className='btn btn-info px-lg-5 px-4 py-lg-2 py-2  mt-3 fs-lg-4 fs-5' style={{ borderRadius: "25px", fontWeight: "bold" }}>SUBMIT A RECIPE</button>
                <Link to={'/My-Recipe'}> <button className='btn btn-primary px-lg-5 px-4 py-lg-2 py-2  mt-3 fs-lg-4 fs-5' style={{ borderRadius: "25px", fontWeight: "bold" }}>Submitted Recipes</button></Link>
                <Link to={'/All-Recipe'}> <button className='btn btn-secondary px-lg-5 px-4 py-lg-2 py-2  mt-3 fs-lg-4 fs-5' style={{ borderRadius: "25px", fontWeight: "bold" }}>All Recipes</button></Link>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>}

      <Modal show={show} onHide={handleClose} size='lg' centered >
        <Modal.Header closeButton style={{ backgroundColor: "rgba(27, 26, 26, 0.93)" }} >
          <Modal.Title style={{ fontWeight: "bold" }} className='text-light'>Share Your Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgba(27, 26, 26, 0.93)" }}>
          <div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center ">
                <label htmlFor="recipeImage">
                  <input key={key} id='recipeImage' type="file" onChange={(e) => handleFile(e)} style={{ display: "none" }} />
                  <img src={preview ? preview : "https://wallpaperaccess.com/full/826948.jpg"} alt="" style={{ width: "100%" }} type="file" />
                </label>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>

          <div className='d-flex flex-column justify-content-center align-items-center'>
            <input type="text" value={recipeDetails.recipename} onChange={(e) => setRecipeDetails({ ...recipeDetails, recipename: e.target.value })} className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} placeholder='Name of the Recipe' />
            <input type="text" value={recipeDetails.time} onChange={(e) => setRecipeDetails({ ...recipeDetails, time: e.target.value })} className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} placeholder='Time' />
            <textarea name="" value={recipeDetails.incredients} id="" onChange={(e) => setRecipeDetails({ ...recipeDetails, incredients: e.target.value })} className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} placeholder='Incredients'></textarea>
            <select name="s" value={recipeDetails.category} id="" onChange={(e) => setRecipeDetails({ ...recipeDetails, category: e.target.value })} className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} >
              <option value="" hidden>Select Category</option>
              <option value="Vegitarian" style={{ fontWeight: "bold" }}>Vegitarian</option>
              <option value="NonVegitarian" style={{ fontWeight: "bold" }}>Non Vegitarian</option>
              <option value="Drinks" style={{ fontWeight: "bold" }}>Drinks</option>
              <option value="Deserts" style={{ fontWeight: "bold" }}>Deserts</option>
              <option value="Snacks" style={{ fontWeight: "bold" }}>Snacks</option>
            </select>
          </div>

        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgba(27, 26, 26, 0.93)" }}>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Submit Recipe
          </Button>
        </Modal.Footer>
      </Modal>

     {/* Home Recipe largescreen */}
     {homeRecipes?.map((item)=>(<div className='mt-3 mb-3' id='homerecipelargescreen'>
            <div className='container-fluid' >
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4 p-lg-1 p-2">
                  <img src={`${serverURL}/upload/${item?.recipeImage}`} alt="" className='w-100' style={{ height: "370px" }} />
                </div>
                <div className="col-md-4 ps-lg-5 ps-1 d-flex flex-column justify-content-center ">
                  <h1 style={{ fontWeight: "bold" }}>{item?.recipename}</h1>
                  <h5 className='mt-lg-2 mt-1'><FontAwesomeIcon icon={faClock} /> {item?.time}</h5>
                  <p className='mt-lg-2 mt-1'><span style={{fontWeight:"bold"}}>Incredients:</span> {item?.incredients}</p>
                  <h5  className='mt-lg-2 mt-1'>{item?.category}</h5>
    
                </div>
                <div className="col-md-2"></div>
              </div>
    
            </div>
    
                     
          </div>))}


           {/* Home Recipe smallscreen */}
           {homeRecipes?.map((item)=>(<div id='homerecipesmallscreen'>
                  <div className='container-fluid'>
                    <div className="row p-2">
                      <div className="col-md-2"></div>
                      <div className="col-md-4  p-2">
                        <img src={`${serverURL}/upload/${item?.recipeImage}`} alt="" className='w-100' style={{ height: "250px" }} />
                      </div>
                      <div className="col-md-4 ps-lg-5 ps-1 d-flex flex-column justify-content-center ">
                        <h1 style={{ fontWeight: "bold" }}>{item?.recipename}</h1>
                        <h5 className=' mt-1'><FontAwesomeIcon icon={faClock} />  {item?.time}</h5>
                        <p className='mt-1'><span style={{fontWeight:"bold"}}>Incredients:</span> {item?.incredients}</p>
                        <h5  className='mt-lg-2 mt-1'>{item?.category}</h5>
          
                      </div>
                      <div className="col-md-2"></div>
                    </div>
          
                  </div>       
                </div>))
                
                }


    </>
  )
}

export default Home