import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import { TOAST_RESET } from '../types/userConstants';
import { useSelector } from 'react-redux';

function Alert() {
    const [show, setShow] = useState(true);
    const toastMessage = useSelector(state => state.toastMessage);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set visibility to true when a new toast message is received
        if (toastMessage) {
            setIsVisible(true);

            // Automatically hide the toast after some time (e.g., 3 seconds)
            const timeout = setTimeout(() => {
                setIsVisible(false);
                dispatch({
                    type: TOAST_RESET
                });
            }, 3000);

            // Cleanup function to clear the timeout
            return () => clearTimeout(timeout);
        }
    }, [toastMessage]);

    if(!isVisible)
    return <></>

    return (
        <div style={{position:"absolute",top:"120px",right:"0",zIndex:"9999"}}>
            <div >

                <Toast onClose={() => setShow(false)} show={show}  bg="dark" className='bg-dark' style={{ width: "220px" }}>
                    <Toast.Header className='bg-dark text-light'>
                        <strong className="me-auto">Alert</strong>
                    </Toast.Header>
                    <Toast.Body className='variant===dark && text-light'>{toastMessage.message}</Toast.Body>
                </Toast>
            </div>
        </div>
    );
}

export default Alert;