import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../common/Message";
import Loader from "../common/Loader";
import {
  deleteProduct,
  listProductDetails,
  listProducts,
  updateProduct,
} from "../../actions/productActions";
import FormContainer from "../common/FormContainer";
import { useNavigate, useParams } from "react-router";
import { PRODUCT_DETAILS_RESET } from "../../types/productConstants";

const EditProductModel = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState(product.name);
  const [keywords, setKeyword] = useState(product?.keywords);

  const [images, setImages] = useState(product?.images);

  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.cost?.price);
  const [negotiable, setNegotiable] = useState(product?.cost?.negotiable);
  const [uploading, setUploading] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;

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
        product._id,
        name,
        images,
        keywords,
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
      <div className="button-3a text-light ms-2" onClick={handleShow} style={{ width: "40%" }}>
        Edit Product
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title className="text-white">Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100">
            <div className="mt-2 mb-2 p-4">

              <Form.Group controlId="images">
                {images.length < 4 && (
                  <> 

                    <Form.File
                      id="image-file"
                      label="Upload Image"
                      className="button-5"
                      onChange={uploadFileHandler}
                    ></Form.File>
                    <p></p>
                    <ul>
                      <li>* Maximum 4 images can be uploaded</li>
                      <li>* Size of each image should be less than 2mb</li>
                    </ul>
                    {uploading && <Loader />}
                  </>)}
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


                <div className="w-100">
                  <div className="w-100 mt-4">
                    <Form className="w-100">
                      <div className="w-100 mt-3" controlId="name" >
                        <Form.Label>Name of the Product </Form.Label>
                        <Form.Control
                          type="text" className="w-100"
                          placeholder="Enter what product do you have"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </div>


                      <Form.Group controlId="category" className="mt-3">
                        <Form.Label>Keyword</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter keywords like: electronics, books, Furniture.. "
                          value={keywords}
                          onChange={(e) => setKeyword(e.target.value)}
                          required
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group controlId="description" className="mt-3">
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
                      <Form.Group controlId="price" className="mt-3">
                        <Form.Label>Price </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group className="mt-3" controlId="negotiable">
                        <Form.Check
                          type="checkbox"
                          label="Is the price Negotiable?"
                          checked={negotiable}
                          onChange={(e) => setNegotiable(e.target.checked)}
                        ></Form.Check>
                      </Form.Group>
                      
                    </Form>
                  </div>
                </div>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <div onClick={submitHandler} className="ms-2  button-7">
            Update
          </div>
          <div className=" button-8" onClick={handleClose}>
            close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductModel;
