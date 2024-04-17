import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "./FormContainer";
import { deleteUser, logout } from "../actions/userActions";
import { USER_LIST_RESET, USER_LOGOUT, USER_REGISTER_RESET, USER_UPDATE_RESET } from "../types/userConstants";

const DeleteAccount = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success, loading, error } = userDelete;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser(id, userData.token));
    handleClose();
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch({
      type: USER_REGISTER_RESET,
    });
    dispatch({
      type: USER_LIST_RESET,
    });
    dispatch({
      type: USER_UPDATE_RESET,
    });
    localStorage.removeItem('userData');
    navigate("/login")
  };

  return (
    <>
      <Button variant="danger" className="mt-2 mb-2 ms-2" onClick={handleShow}>
        Delete My Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title className="text-white">Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <Form  className="mt-2 mb-2">
              <Form.Group controlId="name">
                <Form.Label>
                  Doing this will delete all data assosiated with this account
                </Form.Label>
              </Form.Group>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitHandler} variant="primary" className="ms-2">
            Delete
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;
