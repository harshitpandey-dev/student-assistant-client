import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Loader from "./Loader";
import {
    deleteProduct,
    listProductDetails,
    updateProduct,
} from "../actions/productActions";
import FormContainer from "./FormContainer";
import { useNavigate, useParams } from "react-router";
import { PRODUCT_DETAILS_RESET } from "../types/productConstants";



const AdminEditProductModel = ({ productId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");

    const [images, setImages] = useState([]);

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [negotiable, setNegotiable] = useState(false);
    const [uploading, setUploading] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    var { userData } = userLogin;

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector((state) => state.productUpdate);

    const {
        loading: loadingUpdate,
        error: errorUpdate,

        success: successUpdate,
    } = productUpdate;

    useEffect(()=>{
        dispatch(listProductDetails(productId, userData?.token));
    },[])
 


    useEffect(() => {   
        setName(product?.name);
        setImages(product?.images);
        setDescription(product?.description);
        setPrice(product?.cost?.price);
        setNegotiable(product?.cost?.negotiable);
    }, [ productId,userData,loading]);
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
                setImages([...images, res.data.url]);
            })
            .catch(function (err) {
                console.error(err);
            });
        setUploading(false);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct(
                productId,
                name,
                images,
                description,
                price,
                negotiable
            )
        );
        handleClose();
    };

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteProduct(id));
            navigate("/");
        }
    };
    const removeImg = (fileToRemove) => {
        // console.log(fileToRemove);
        const updatedImages = images.filter((file) => file !== fileToRemove);
        setImages(updatedImages);
    };









    return (
        <>
            <Button variant="light" className="btn-sm" style={{ width: "30px", height: "30px" }} onClick={handleShow}>
                <i className="fas fa-edit"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-secondary">
                    <Modal.Title className="text-white">Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div  >
                        <Form className="mt-2 mb-2">
                            <Form.Group controlId="name">
                                <Form.Label>


                                    <FormContainer>
                                        {loading ? (
                                            <Loader />
                                        ) : error ? (
                                            <Message variant="danger">{error}</Message>
                                        ) : (
                                            <Form >
                                                <Form.Group controlId="name">
                                                    <Form.Label>Name of the property </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter what product do you have"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId="images">
                                                    <Form.Label>
                                                        Image <small> *Upload Image only</small>{" "}
                                                    </Form.Label>

                                                    <Form.File
                                                        id="image-file"
                                                        label="Choose File"
                                                        custom
                                                        onChange={uploadFileHandler}
                                                    ></Form.File>
                                                    {images && (
                                                        <div className="position-relative mt-5">
                                                            {images.map((ele, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="d-inline-block position-relative"
                                                                >
                                                                    <img
                                                                        className="mt-2"
                                                                        src={ele}
                                                                        style={{ height: "100px" }}
                                                                        alt={`image${index + 1}`}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                                                        style={{ width: "30px", height: "40px" }}
                                                                        onClick={() => removeImg(ele)}
                                                                    >
                                                                        X
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {uploading && <Loader />}
                                                </Form.Group>

                                                <Form.Group controlId="description">
                                                    <Form.Label>Describe your property </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        placeholder="Enter description"
                                                        row="3"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        required
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="price">
                                                    <Form.Label>Price </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter price"
                                                        value={price}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Form.Group className="mb-5 mt-5" controlId="negotiable">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Is the price Negotiable?"
                                                        checked={negotiable}
                                                        onChange={(e) => setNegotiable(e.target.checked)}
                                                    ></Form.Check>
                                                </Form.Group>
                                            </Form>

                                        )}
                                 </FormContainer>
                                </Form.Label>
                            </Form.Group>
                        </Form>
                    </div>




                </Modal.Body>
                <Modal.Footer>
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
};

export default AdminEditProductModel;
