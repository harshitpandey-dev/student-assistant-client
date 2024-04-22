import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import FormContainer from "./FormContainer";
import Loader from "./Loader";
import { updateUser, getUserDetails } from "../actions/userActions";
import { USER_UPDATE_RESET, USER_DETAILS_RESET } from "../types/userConstants";

const AdminUpdateUser = ({ Edituser}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [fullname, setFullname] = useState(Edituser?.fullname);
    const [username, setUsername] = useState(Edituser?.username);
    const [email, setEmail] = useState(Edituser?.email);
    const [contact, setContact] = useState(Edituser?.contact);
    const [update, setUpdate] = useState(false);

    const userLogin = useSelector((state) => state.userLogin);
    const { userData } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { user, loading: loadingDetails } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { success, loading, error } = userUpdate;




    useEffect(() => {
        if (fullname !== "" || username !== "" || contact !== "") {
            if (
                fullname !== Edituser.fullname ||
                username !== Edituser.username ||
                contact !== Edituser.contact
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
            updateUser({
                _id: Edituser._id,
                fullname,
                username,
                contact,
            },Edituser.token)
        );
        handleClose();
    };

    return (
        <>
            <Button variant="light" className="btn-sm" style={{ width: "30px", height: "30px" }} onClick={handleShow}>
                <i className="fas fa-edit"></i>
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
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
                    </Button>
                    {update ? (
                        <Button onClick={submitHandler} variant="primary" className="ms-2">
                            Update Profile
                        </Button>
                    ) : (
                        <Button type="submit" variant="primary" className="ms-2" disabled>
                            Update Profile
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminUpdateUser;
