import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { serverURL } from '../service/serverUrl';
import { updateUserRecipeAPI } from '../service/allApi';
import { editResponseContent } from '../context/ContextShare';
function Edit({ recipes }) {

  const {setEditResponse} = useContext(editResponseContent)

  const [preview, setPreview] = useState("")
  const [show, setShow] = useState(false);
  const [key, setKey] = useState(0)

  const handleClose = () =>{
    handleCancel()
    setShow(false);
  } 
  const handleShow = () => setShow(true);
  console.log(recipes);

  const [recipeDetails, setRecipeDetails] = useState({
    recipename: recipes?.recipename,
    time: recipes?.time,
    incredients: recipes?.incredients,
    category: recipes?.category,
    recipeImage: ""
  })
  console.log(recipeDetails);

  const handleFile = (e) => {
    setRecipeDetails({ ...recipeDetails, recipeImage: e.target.files[0] })

  }

  const handleCancel = () => {
    setRecipeDetails({
      recipename: recipes?.recipename,
      time: recipes?.time,
      incredients: recipes?.incredients,
      category: recipes?.category,
      recipeImage: ""
    })
    setPreview("")
    if (key == 0) {
      setKey(1)
    }else{
      setKey(0)
    }
  }

  const handleUpdate = async ()=>{
    const {recipename, time, incredients, category, recipeImage} = recipeDetails
    console.log(recipename, time, incredients, category, recipeImage);
    if(!recipename || !time || !incredients || !category){
      alert(`Fill the form completly`)
    }else{
      const reqBody = new FormData()
      reqBody.append("recipename", recipename)
      reqBody.append("time", time)
      reqBody.append("incredients", incredients)
      reqBody.append("category", category)
      preview ?reqBody.append("recipeImage", recipeImage) : reqBody.append("recipeImage", recipes.recipeImage)

      //reqHeader
      const token = sessionStorage.getItem("token")
      if (preview){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserRecipeAPI(recipes._id, reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          setEditResponse(result)
          alert(`Recipe updated Successfully `)
          setTimeout(()=>{
            handleClose()
          },[2000])
        } else if (result.status == 406) {
          alert(result.response.data)

        } else {
          alert(`Something went wrong`)
        }
        
      }else{
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserRecipeAPI(recipes._id, reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          setEditResponse(result)
          alert(`Recipe updated Successfully `)
          setTimeout(()=>{
            handleClose()
          },[2000])
        } else if (result.status == 406) {
          alert(result.response.data)

        } else {
          alert(`Something went wrong`)
        }

      }
      
    }
    
  }



  useEffect(() => {
    if (recipeDetails.recipeImage) {
      setPreview(URL.createObjectURL(recipeDetails.recipeImage))
    }
  }, [recipeDetails.recipeImage])


  return (
    <>

      <div className='coveringdiv'><div onClick={handleShow} className='bg-primary d-flex justify-content-center align-items-center rounded' id='editbutton' ><FontAwesomeIcon icon={faPenToSquare} style={{ color: "black" }} /></div></div>
      <Modal show={show} onHide={handleClose} size='lg' centered >
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='bg-dark text-light' style={{ fontWeight: "bold" }}  >Share Your Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'><div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center ">
              <label htmlFor="recipeImage">
                <input key={key} id='recipeImage' type="file" onChange={(e) => handleFile(e)} style={{ display: "none" }} />
                <img src={preview ? preview : `${serverURL}/upload/${recipes?.recipeImage}`} alt="" style={{ width: "100%" }} type="file" />
              </label>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>

          <div className='d-flex flex-column justify-content-center align-items-center'>
            <input onChange={(e) => setRecipeDetails({ ...recipeDetails, recipename: e.target.value })} value={recipeDetails.recipename} type="text" className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} placeholder='Name of the Recipe' />
            <input onChange={(e) => setRecipeDetails({ ...recipeDetails, time: e.target.value })} value={recipeDetails.time} type="text" className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} placeholder='Time' />
            <textarea onChange={(e) => setRecipeDetails({ ...recipeDetails, incredients: e.target.value })} value={recipeDetails.incredients} name="" className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} placeholder='Incredients'></textarea>
            <select onChange={(e) => setRecipeDetails({ ...recipeDetails, category: e.target.value })} value={recipeDetails.category} name="s" className='w-75 form-control mt-lg-4 mt-3 text-center' style={{ borderRadius: "15px", fontWeight: "bold" }} >
              <option value="" hidden>Select Category</option>
              <option value="Vegitarian" style={{ fontWeight: "bold" }}>Vegitarian</option>
              <option value="NonVegitarian" style={{ fontWeight: "bold" }}>Non Vegitarian</option>
              <option value="Drinks" style={{ fontWeight: "bold" }}>Drinks</option>
              <option value="Deserts" style={{ fontWeight: "bold" }}>Deserts</option>
              <option value="Snacks" style={{ fontWeight: "bold" }}>Snacks</option>
            </select>
          </div>

        </Modal.Body>
        <Modal.Footer className='bg-dark'>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit