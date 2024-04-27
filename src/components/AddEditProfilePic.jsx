import React, { useState } from 'react'
import { Button, Modal,Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import Loader from './Loader';


export default function AddEditProfilePic({user}) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [uploading, setUploading] = useState(false);
    const url = (user?.profile) ? user.profile :"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
    
    const [images, setImages] = useState(url);


    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dh3bp7vbd/upload";
    const CLOUDINARY_UPLOAD_PRESET = "qwdzopo4";
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        setUploading(true);
        await axios({
            url: CLOUDINARY_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: formData,
        })
            .then(function (res) {
                setImages(res.data.url);
            })
            .catch(function (err) {
                console.error(err);
            });
        setUploading(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(
        //     updateProduct(
        //         product._id,
        //         name,
        //         images,
        //         keywords,
        //         description,
        //         price,
        //         negotiable,
        //         sold
        //     )
        // );
        handleClose();
    };

    return (
        <>
            <div className="btn-sm" style={{cursor:"pointer"}} onClick={handleShow}>
                <img src={url} alt="" className="img-avatar box-img" />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-secondary">
                    <Modal.Title className="text-white">Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark' >
                 
             
                  <div className="position-relative mt-5">
                   
                        <img
                          className="mt-2"
                          src={images}
                          style={{ height: "300px",width:"100%" }}
                          alt={`Profile_image`}
                        />
                      </div>
             
                 
                    {uploading && <Loader />}
                    <Form>
                <Form.File
                    id="image-file"
                    label="Edit Image"
                    onChange={uploadFileHandler}
                ></Form.File>

                    </Form>
                </Modal.Body>
                
                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={submitHandler} variant="primary" className="ms-2">
                        Update
                    </Button>
                    <Button variant="warning" onClick={handleClose}>
                        close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
