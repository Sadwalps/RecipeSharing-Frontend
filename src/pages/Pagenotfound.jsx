import React from 'react'

function Pagenotfound() {
  return (
    <>
    <div className='container-fluid' id='pagenotfound'>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex justify-content-center flex-column align-items-center">
          <img src="https://static.vecteezy.com/system/resources/previews/013/477/889/non_2x/empty-meal-trays-cartoon-food-dish-tray-cycle-wooden-tray-with-handle-restaurant-isolated-illustration-of-empty-tray-for-food-realistic-3d-vector.jpg" alt="" style={{height:"500px"}} className='w-75' />
          <h1 style={{fontWeight:"bold"}} className='mb-4 text-danger'>Page Not Found !!!</h1>
          
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
    </>
  )
}

export default Pagenotfound