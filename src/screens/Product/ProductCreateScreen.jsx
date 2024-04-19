import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { createProduct } from "../../actions/productActions";
import FormContainer from "../../components/FormContainer";
// import Header from "../../components/Header";
import { useNavigate } from "react-router";
import Header from "../../components/Header";

const ProductCreateScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [negotiable, setNegotiable] = useState(false);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    }
    if (success || !userData) {
      navigate("/login");
    }
  }, [success, userData]);

  const uploadFileHandler = async (e) => {
    const data = e.target.files[0];
    if (!data) return;
    const file = Array.from(e.target.files);
    setShowImages((images) => [...images, ...file]);

    // const imagesData = [...images];
    // imagesData.push(data);
    // setImages(imagesData);
    // setUploading(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const imagesData = [];
    showImages.map((file) => {
      const data = file;
      imagesData.push(data);
    });
    // console.log(imagesData);
    setImages(imagesData);
    setUploading(false);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("negotiable", negotiable);
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      formData.append("images", file);
    }
    dispatch(createProduct(formData));
  };
  // console.log(showImages);
  const removeImg = (fileToRemove) => {
    // console.log(fileToRemove);
    const updatedImages = showImages.filter((file) => file !== fileToRemove);
    setShowImages(updatedImages);
  };

  return (
    <>
      <Header />

      <div style={{ width: "100vw", height: "80px" }}></div>
      <div className="py-3 ">
        <FormContainer>
          <h1
            className=" py-2 text-center"
            style={{ fontFamily: "'Gluten', sans-serif", color: "#8991E4" }}
          >
            Upload Your Property
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name of the property </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter what product do you have"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              {showImages.length < 4 && (
                <Form.Group controlId="images">
                  <Form.Label>
                    Image <small> *Upload Image only</small>
                  </Form.Label>

                  <Form.File
                    id="image-file"
                    label="Choose File"
                    onChange={uploadFileHandler}
                  />
                </Form.Group>
              )}

              {uploading && <Loader />}
              {showImages && (
                <div className="position-relative mt-5">
                  {showImages.map((file, index) => (
                    <div
                      key={index}
                      className="d-inline-block position-relative"
                    >
                      <img
                        className="mt-2"
                        src={URL.createObjectURL(file)}
                        style={{ height: "100px" }}
                        alt={`image${index + 1}`}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        style={{ width: "30px", height: "40px" }}
                        onClick={() => removeImg(file)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* <Form.Group controlId="category">
                <Form.Label>Category </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category like: electronics, books, Furniture.. "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group> */}

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

              {/* <Form.Group controlId="expiresOn">
                <Form.Label>How long is your product for sale? </Form.Label>
                <Form.Control
                  type="date"
                  value={expiresOn}
                  onChange={(e) => setExpiresOn(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group> */}

              <Form.Group className="mb-5" controlId="price">
                <Form.Label>Price </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="negotiable">
                <Form.Check
                  type="checkbox"
                  label="Is the price Negotiable?"
                  checked={negotiable}
                  onChange={(e) => setNegotiable(e.target.checked)}
                ></Form.Check>
              </Form.Group>
              {/* <Form.Group className="mt-5" controlId="shippingaddress">
                <Form.Label>Shipping Address </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter where can you deliver"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group> */}

              {/* <Form.Group controlId="shippingCharge">
                <Form.Label>Shipping Charge </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter how much will you charge for shipping"
                  value={shippingCharge}
                  onChange={(e) => setShippingCharge(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group> */}

              <Button className="mt-3 w-100" type="submit" variant="primary">
                Upload your property
              </Button>
              {error && <Message variant="danger">{error}</Message>}
            </Form>
          )}
        </FormContainer>
      </div>
    </>
  );
};

export default ProductCreateScreen;
