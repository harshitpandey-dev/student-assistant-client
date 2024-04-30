import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../common/FormContainer";
import { deleteUser } from "../../actions/userActions";

const AdminDeleteAccountModel = ({ userId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success, loading, error } = userDelete;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser(userId, userData.token));
    handleClose();
  };

  return (
    <>
      <Button
        variant="danger"
        className="btn-sm"
        onClick={handleShow}
        style={{ width: "30px", height: "30px" }}
      >
        <i className="fas fa-trash"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title className="text-white">Delete User Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <Form className="mt-2 mb-2">
              <Form.Group controlId="name">
                <Form.Label>
                  Doing this will delete all data assosiated with this account
                </Form.Label>
              </Form.Group>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div onClick={submitHandler} className="ms-2  button-7">
            Delete
          </div>
          <div className=" button-8" onClick={handleClose}>
            Close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminDeleteAccountModel;
