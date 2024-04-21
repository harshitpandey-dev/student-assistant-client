import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { deleteProduct } from "../actions/productActions";

const UserPrductDeleteModel = ({ productId }) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const userLogin = useSelector((state) => state.userLogin);



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
                                <Form.Label>
                                    Doing this will delete this product
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

export default UserPrductDeleteModel;
