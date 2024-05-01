/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../common/Loader";
import { updateProfile } from "../../actions/userActions";

export default function AddEditProfilePic({ user }) {
  const default_image =
    "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(
    user?.profile ? user.profile : default_image
  );

  const [selectedImage, setSelectedImage] = useState(null);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/webp",
      "image/svg+xml",
    ];
    if (allowedTypes.includes(file.type)) {
      setSelectedImage(file);
      setImage(URL.createObjectURL(file));
    } else {
      console.error("Invalid file type. ");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("profile", selectedImage);
      dispatch(updateProfile(user, formData));
      handleClose();
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setUploading(false);
    }
  };

  const clearFileInput = () => {
    setImage(user?.profile || default_image);
    setSelectedImage(user?.profile || default_image);
  };

  return (
    <>
      <div
        className="btn-sm"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        <img
          src={image}
          alt=""
          style={{ borderRadius: "50%" }}
          className="img-avatar box-img"
        />
      </div>

      <Modal
        show={show}
        onHide={() => {
          clearFileInput();
          handleClose();
        }}
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="text-dark">Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="position-relative mt-5">
            <img
              className="mt-2"
              src={image}
              style={{ height: "300px", width: "100%" }}
              alt={`Profile_image`}
            />
          </div>

          {uploading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.File
              id="image-file"
              label="Edit Image"
              className="button-5 m-2"
              onChange={uploadFileHandler}
            ></Form.File>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <div onClick={submitHandler} className="ms-2  button-7">
            Update
          </div>
          <div
            className=" button-8"
            onClick={() => {
              clearFileInput();
              handleClose();
            }}
          >
            close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
