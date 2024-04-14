import React from 'react'
import Modal from 'react-bootstrap/Modal';

export default function OpenImage({handleClose,show,url,msg}) {


  return (
    <div>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton varient="danger" className='bg-dark'>
              </Modal.Header>
              <Modal.Body className='bg-dark'>
                 <img src={url}></img>
              </Modal.Body>
              <Modal.Footer style={{ fontFamily: "'Gluten', sans-serif" }} className='bg-dark text-light'>
              {msg}
              </Modal.Footer>
          </Modal>
    </div>
  )
}
