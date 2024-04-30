import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../common/Loader";
import { updateProfile } from "../../actions/userActions";

export default function AddEditProfilePic({ user }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [uploading, setUploading] = useState(false);
  const url = user?.profile
    ? user.profile
    : "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";

  const [images, setImages] = useState(url);
  const [sendimages, setSendImages] = useState(null);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setImages(URL.createObjectURL(file));
    setSendImages(e.target.files[0]);
    // console.log(sendimages);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // console.log(sendimages);
    formData.append("profile", sendimages);

    dispatch(updateProfile(user, formData));
    handleClose();
  };

  return (
    <>
      <div
        className="btn-sm"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        <img
          src={url}
          alt=""
          style={{ borderRadius: "50%" }}
          className="img-avatar box-img"
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-dark">Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="position-relative mt-5">
            <img
              className="mt-2"
              src={images}
              style={{ height: "300px", width: "100%" }}
              alt={`Profile_image`}
            />
          </div>

          {uploading && <Loader />}
          <Form>
            <Form.File
              id="image-file"
              label="Edit Image"
              className="button-5 m-2"
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
  );
}
