import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../common/FormContainer";
import { deleteProduct } from "../../actions/productActions";

const AdminProductDeleteModel = ({ productId }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteProduct(productId));
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
          <Modal.Title className="text-white">Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <Form className="mt-2 mb-2">
              <Form.Group controlId="name">
                <Form.Label>Doing this will delete this product</Form.Label>
              </Form.Group>
            </Form>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div onClick={submitHandler} className="ms-2  button-7">
            Delete
          </div>
          <div className=" button-8"  onClick={handleClose}>
            Close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminProductDeleteModel;
