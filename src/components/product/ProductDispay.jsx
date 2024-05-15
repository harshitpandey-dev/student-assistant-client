/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { updateUserWishlist } from "../../actions/userActions";
import EditProductModel from "./EditProductModel";
import { Card } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";

export default function ProductDispay({ product }) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;
  const getWishlist = useSelector((state) => state.userWishlist);
  var { wishlist } = getWishlist;

  const [ind, setInd] = useState(0);

  const images = product?.images;
  const isYourProduct = userData?._id === product?.owner?._id;

  const isWishlisted =
    wishlist && wishlist.length > 0
      ? wishlist?.some((item) => item._id === product._id)
      : false;

  function handleWishlist() {
    dispatch(updateUserWishlist(product._id, userData.token));
    window.location.reload();
  }

  function prevImage() {
    if (ind == 0) {
      setInd(images.length - 1);
    } else {
      setInd(ind - 1);
    }
  }
  function nextImage() {
    if (ind + 1 == images.length) {
      setInd(0);
    } else {
      setInd(ind + 1);
    }
  }
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   handleClose();
  // }

  return (
    <>
      <div
        className="w-100  bg-light"
        onClick={handleShow}
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          className="card-image"
          style={{ height: "300px" }}
          src={product.images[0]}
        />
      </div>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton className="bg-secondary ">
          <Modal.Title className="text-white">Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light ">
          <section className="">
            <div className="container">
              <div className="row gx-5 d-flex flex-warp">
                <aside className="col-lg-6">
                  <div className="border rounded-4 mb-3 d-flex justify-content-center">
                    <a
                      data-fslightbox="mygalley"
                      className="rounded-4"
                      target="_blank"
                      data-type="image"
                      href={images[ind]}
                    >
                      <img
                        style={{
                          maxWidth: "100%",
                          height: "300px",
                          padding: "12px",
                          minWidth: "250px",
                        }}
                        className="rounded-4 fit"
                        src={images[ind]}
                      />
                    </a>
                  </div>
                  <div className="d-flex justify-content-center mb-3 flex-column align-items-center">
                    <div className="d-flex ">
                      <p>
                        {images.map((ele, loc) => {
                          return loc == ind ? <GoDot /> : <GoDotFill />;
                        })}
                      </p>
                    </div>
                    <div>
                      <div className="btn btn-lg">
                        <MdArrowBackIos onClick={prevImage} />
                      </div>
                      <div className="btn btn-lg">
                        <MdArrowForwardIos onClick={nextImage} />
                      </div>
                    </div>
                  </div>
                </aside>
                <main className="col-lg-6">
                  <div>
                    <h4
                      className="title text-success fs-1 "
                      style={{ textTransform: "uppercase" }}
                    >
                      {product.name} <br />
                      <p className="fs-5 text-secondary mt-3">
                        {product?.keywords}
                      </p>
                    </h4>
                    <div className="d-flex flex-row my-3"></div>
                    <div className="d-flex">
                      <dt className="col-6">Seller Name:</dt>
                      <dd className="col-6">{product?.owner?.username}</dd>
                    </div>

                    <div className="mb-3">
                      <span className="h3 ">₹ {product?.cost?.price}</span>
                      <span className="text-muted">
                        {" "}
                        {product?.cost?.negotiable && <li> (Negotiable)</li>}
                      </span>
                    </div>

                    <p>{product.description}</p>
                  </div>
                  <div className="w-100 d-flex">
                    {isWishlisted ? (
                      <div
                        className="remWish  text-danger d-flex align-items-center justify-content-center"
                        style={{ width: "50%", fontSize: "12px" }}
                        onClick={handleWishlist}
                      >
                        <FaRegHeart /> Remove
                      </div>
                    ) : (
                      <div
                        className="addWish text-success d-flex align-items-center justify-content-center"
                        style={{ width: "50%", fontSize: "12px" }}
                        onClick={handleWishlist}
                      >
                        <FaRegHeart /> Add To WishList
                      </div>
                    )}
                    {isYourProduct ? (
                      <EditProductModel product={product} />
                    ) : (
                      <div
                        className="button-3 resp text-light ms-2"
                        style={{ width: "40%" }}
                      >
                        <Link to={`/chatScreen/${product?.owner?._id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20px"
                            height="20px"
                            fill="currentColor"
                            className="bi bi-chat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                          </svg>
                          <span style={{ fontSize: "12px" }}>
                            {" "}
                            Chat With Seller
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </main>
              </div>
            </div>
          </section>
        </Modal.Body>
        {/* <Modal.Footer className="bg-light ">
                    {isWishlisted ?
                        <Button variant="success" onClick={handleWishlist}>
                            Remove from wishList
                        </Button> : <Button variant="danger" onClick={handleWishlist}>
                           Add to wishList
                        </Button>}
                    {isYourProduct ? <Button variant="primary" disabled>
                       Your Product
                    </Button> : <Button variant="primary" >
                            <Link to={`/chatScreen/${product?.owner?._id}`} >  Chat With Seller</Link>
                    </Button>}
                </Modal.Footer> */}
      </Modal>
    </>
  );
}
