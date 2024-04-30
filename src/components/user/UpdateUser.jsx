import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import FormContainer from "../common/FormContainer";
// import Message from "./Message";
import Loader from "../common/Loader";
import { updateUser, getUserDetails } from "../../actions/userActions";
import {
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
} from "../../types/userConstants";
import { FaUserEdit } from "react-icons/fa";

const UpdateUser = ({ currUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fullname, setFullname] = useState(currUser?.fullname);
  const [username, setUsername] = useState(currUser?.username);
  const [email, setEmail] = useState(currUser?.email);
  const [contact, setContact] = useState(currUser?.contact);
  const [update, setUpdate] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading: loadingDetails } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success, loading, error } = userUpdate;

  // useEffect(() => {
  //   if (!userData) {
  //     navigate("/login");
  //     return;
  //   }
  //   if (!userData || success) {
  //     dispatch({ type: USER_UPDATE_RESET });
  //     dispatch({ type: USER_DETAILS_RESET });
  //   } else {
  //     if (!user || user._id !== id) {
  //       dispatch(getUserDetails(id));
  //     } else {
  //       setFullname(user.fullname);
  //       setUsername(user.username);
  //       setContact(user.contact);
  //       setEmail(user.email);
  //     }
  //   }
  // }, [userData, user, success, dispatch, id, navigate]);

  useEffect(() => {
    if (fullname !== "" || username !== "" || contact !== "") {
      if (
        fullname !== user.fullname ||
        username !== user.username ||
        contact !== user.contact
      ) {
        setUpdate(true);
      } else {
        setUpdate(false);
      }
    } else {
      setUpdate(false);
    }
  }, [fullname, username, contact, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(
        {
          _id: currUser._id,
          fullname,
          username,
          contact,
        },
        currUser.token
      )
    );
    handleClose();
  };

  return (
    <>
      <Button
        variant="secondary"
        className="mt-2 mb-2 ms-2"
        onClick={handleShow}
        style={{ width: "70px", height: "40px" }}
      >
        <FaUserEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title className="text-white">Edit User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            {loadingDetails && <Loader />}
            <Form className="mt-2 mb-2">
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="contact">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile No"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={email}
                  value={email}
                  disabled
                />
              </Form.Group>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          {update ? (
            <div onClick={submitHandler} className="ms-2  button-7">
              Update Profile
            </div>
          ) : (
              <div type="submit" className="ms-2  button-7" disabled>
              Update Profile
            </div>
          )}
          <div className=" button-8" onClick={handleClose}>
            Close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUser;
