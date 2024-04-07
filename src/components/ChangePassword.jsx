import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Message from './Message';
import { useDispatch } from "react-redux";
import { updateUserPassword } from '../actions/userActions';

export default function ChangePassword() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [val,setVal]=useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:""

    })
    const [message, setMessage] = useState(null);

    function handleSubmit(e){
        e.preventDefault();
        if (val.newPassword !== val.confirmPassword) {
            setMessage("Passwords do not match");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } else {
            dispatch(
                updateUserPassword({
                    currentPassword: val.currentPassword,
                    newPassword: val.newPassword,
                    confirmPassword: val.confirmPassword
                })
            );
            handleClose()
        }
    }
  return (
            <>
                <Button variant="warning" className='mt-2 mb-2 ms-2' onClick={handleShow}>
                   Change Password
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change Password</Modal.Title>
                  {message && <Message variant="danger">{message}</Message>}
                    </Modal.Header>
                    <Modal.Body>
                  <input placeholder='Current Password' className='w-100 mt-3 mb-3' value={val.currentPassword} onChange={(e) => setVal({...val,currentPassword:e.target.value})}></input>
                  <input placeholder='new Password' className='w-100 mt-3 mb-3' value={val.newPassword} onChange={(e) => setVal({ ...val, newPassword: e.target.value })}></input>
                  <input placeholder='confirm Password' className='w-100 mt-3 mb-3' value={val.confirmPassword} onChange={(e) => setVal({ ...val, confirmPassword: e.target.value })}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

