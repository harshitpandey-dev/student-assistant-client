import { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Carousel from "react-bootstrap/Carousel";
// import Header from "../../components/Header";
import { listProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { getUserWishlist, updateUserWishlist } from "../../actions/userActions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductScreen = () => {
  const navigate = useNavigate();
  const match = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;
  const getWishlist = useSelector((state) => state.userWishlist);
  var { wishlist } = getWishlist;
  const [isWishlisted,setIsWishlisted]=useState(false)

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    }

    if (!userData) {
      navigate("/login");
      return;
    }
    dispatch(listProductDetails(match.id, userData.token));
  }, [match.id, dispatch, userData]);
  useEffect(()=>{
    dispatch(getUserWishlist(userData.token));
    
    const val = (wishlist && wishlist.length > 0) ? wishlist?.some(item => item._id === product._id) : false;
    setIsWishlisted(val);
  },[])

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  function handleWishlist() {
    dispatch(updateUserWishlist(product._id, userData.token))
    window.location.reload();
  }

  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100px" }}></div>
      <div className="py-2 ">
        <Link to="/" className="btn btn-success my-3 ms-2">
          Go Back
        </Link>
        <br />

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Row className="row mb-2">
              <Col md={6} className="image-area">
                <Carousel>
                  {product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        className="d-block w-100"
                        src={image}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>

              <Col className="borderaround ps-5 " md={6}>
                <p className="details">
                  <i className="fas fa-info"></i> Details
                </p>

                <Row>
                  <Col className="product  " md={4} sm={4} xs={4}>
                    <ul>
                      <li> Product Name</li>

                      <li> Posted Price</li>

                      <li> Owner</li>

                      <li> Description </li>

                      {product?.cost?.negotiable && <li>Negotiable:</li>}

                    </ul>
                  </Col>
                  <Col md={8} sm={8} xs={8}>
                    <ul>
                          <li style={{ textTransform: "uppercase" }}>{product.name}</li>

                      <li>{product?.cost?.price}</li>

                      <li> {product?.owner?.username}</li>

                      <li> {product.description} </li>

                      {product?.cost?.negotiable && <li>Yes</li>}

                    </ul>
                  </Col>
                </Row>
                          <Link to={`/chatScreen/${product.owner?._id}`}><Button> chat with seller</Button> </Link>
                      <Button onClick={handleWishlist} className={isWishlisted?"bg-success":"bg-danger"}>{isWishlisted?"Remove From Wishlist": "Add to wishlist"} </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductScreen;
