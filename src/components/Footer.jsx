import { faFacebookF, faInstagram, faWhatsapp, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <>
     <div className='container-fluid bg-dark pt-lg-4 pt-3 pb-lg-4 pb-3'>
      <div className="row text-light">
        <div className="col-md-1"></div>
        <div className="col-md-5 p-lg-3 ">
          <h2>RECI</h2>
          <p style={{textAlign:"justify", marginTop:"10px"}}>A recipe is a story that ends with a good meal
          </p>
        </div>
        <div className="col-md-5 d-flex justify-content-center align-items-center ">
          <div className='d-flex gap-lg-3 gap-2 '>
            <div className='footerlogos'><FontAwesomeIcon icon={faWhatsapp} /></div>
            <div className='footerlogos'><FontAwesomeIcon icon={faInstagram} /></div>
            <div className='footerlogos'><FontAwesomeIcon icon={faFacebookF} /></div>
            <div className='footerlogos'><FontAwesomeIcon icon={faXTwitter} /></div>
            <div className='footerlogos'><FontAwesomeIcon icon={faYoutube} /></div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>


     </div>
    </>
  )
}

export default Footer