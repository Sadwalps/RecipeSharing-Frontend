import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { getUserRecipesAPI, removeUserRecipeAPI } from '../service/allApi'
import { serverURL } from '../service/serverUrl'

import Edit from '../components/Edit'
import { editResponseContent } from '../context/ContextShare'
import Header from '../components/Header'


function MyRecipe() {
    const { editResponse } = useContext(editResponseContent)
    const [userRecipe, setUserRecipe] = useState([])
    const [removeStatus, setRemoveStatus] = useState({})

    const getUserRecipe = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await getUserRecipesAPI(reqHeader)
            console.log(result.data);
            setUserRecipe(result.data)


        }
    }
    console.log(userRecipe);


    const handleDelete = async (id) => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await removeUserRecipeAPI(id, reqHeader)
            console.log(result);
            if (result.status == 200) {
                alert(`Recipe Deleted`)
                setRemoveStatus(result)

            } else {
                alert(`Something went wrong`)

            }


        }

    }

    useEffect(() => {
        getUserRecipe()
    }, [removeStatus, editResponse])




    return (
        <>
            <Header />



            {/* My Recipe largescreen */}


             
            <div style={{minHeight:"70vh"}}>
            {userRecipe ?
                userRecipe?.map((item) => (<div className='mt-3 mb-3' id='homerecipelargescreen'>
                    <div className='container-fluid'>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-4 p-lg-1 p-2">
                                <img src={`${serverURL}/upload/${item?.recipeImage}`} alt="" className='w-100' style={{ height: "340px" }} />
                            </div>
                            <div className="col-md-4 ps-lg-5 ps-1 d-flex flex-column justify-content-center ">
                                <h1 style={{ fontWeight: "bold" }}>{item?.recipename}</h1>
                                <h5 className='mt-lg-2 mt-1'><FontAwesomeIcon icon={faClock} /> {item?.time}</h5>
                                <p className='mt-lg-2 mt-1'><span style={{ fontWeight: "bold" }}>Incredients:</span> {item?.incredients}</p>
                                <h5 className='mb-2'>{item?.category}</h5>


                                <div className='d-flex justify-content-between'>
                                    <Edit recipes={item} />
                                    <div className='coveringdiv'> <div onClick={() => handleDelete(item?._id)} className='bg-danger  d-flex justify-content-center align-items-center rounded' id='deletebutton'><FontAwesomeIcon icon={faTrash} style={{ color: "black" }} /></div>  </div>

                                </div>

                            </div>
                            <div className="col-md-2"></div>
                        </div>

                    </div>
                </div>



                )) :

                <div className='container-fluid ' style={{ height: "65vh" }}>
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6  text-info mt-5 pt-5  d-flex flex-column justify-content-center align-items-center">
                            <img src="https://www.creativefabrica.com/wp-content/uploads/2023/10/26/Empty-meal-tray-Cartoon-kicthen-contain-Graphics-82559752-1.png" alt="" style={{ height: "200px" }} />
                            <h1 className='text-center ' style={{ fontWeight: "bold" }}>No Recipe Added Yet!!!</h1>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>}
                </div>





            {userRecipe ?
                userRecipe?.map((item) => (<div id='homerecipesmallscreen'>
                    <div className='container-fluid'>
                        <div className="row p-2">
                            <div className="col-md-2"></div>
                            <div className="col-md-4  p-2">
                                <img src={`${serverURL}/upload/${item?.recipeImage}`} alt="" className='w-100' style={{ height: "250px" }} />
                            </div>
                            <div className="col-md-4 ps-lg-5 ps-1 d-flex flex-column justify-content-center ">
                                <h1 style={{ fontWeight: "bold" }}>{item?.recipename}</h1>
                                <h5 className=' mt-1'><FontAwesomeIcon icon={faClock} /> {item?.time}</h5>
                                <p className='mt-1'><span style={{ fontWeight: "bold" }}>Incredients:</span> {item?.incredients}</p>
                                <h5 className='mb-2'>{item?.category}</h5>

                                <div className='d-flex justify-content-between'>
                                    <Edit />
                                    <div className='coveringdiv'> <div onClick={() => handleDelete(item?._id)} className='bg-danger  d-flex justify-content-center align-items-center rounded' id='deletebutton'><FontAwesomeIcon icon={faTrash} style={{ color: "black" }} /></div> </div>

                                </div>


                            </div>
                            <div className="col-md-2"></div>
                        </div>

                    </div>
                </div>)) :
                <div className='container-fluid ' style={{ height: "65vh" }}>
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6  text-info mt-5 pt-5  d-flex flex-column justify-content-center align-items-center">
                            <img src="https://www.creativefabrica.com/wp-content/uploads/2023/10/26/Empty-meal-tray-Cartoon-kicthen-contain-Graphics-82559752-1.png" alt="" style={{ height: "200px" }} />
                            <h1 className='text-center ' style={{ fontWeight: "bold" }}>No Recipe Added yet!!!</h1>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>

            }

        </>
    )
}

export default MyRecipe