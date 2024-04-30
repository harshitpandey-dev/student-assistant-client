/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { updateUserWishlist } from "../../actions/userActions";
import EditProductModel from "./EditProductModel";

export default function ProductDispay({ product, userID, token }) {
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
      <div className="w-100 h-100 bg-light" onClick={handleShow}>
        <Product product={product} userID={userID} token={token} />
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
                          padding: "10px",
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
                      <div className="button-4  text-danger" style={{width:"50%"}} onClick={handleWishlist}>
                      Remove from wishList
                    </div>
                  ) : (
                        <div className="button-4 text-success" style={{ width: "50%" }} onClick={handleWishlist}>
                      Add to wishList
                    </div>
                  )}
                  {isYourProduct ? (
                    <EditProductModel product={product} />
                  ) : (
                        <div className="button-3 text-light" style={{ width: "50%" }}>
                      <Link to={`/chatScreen/${product?.owner?._id}`} >
                        {" "}
                        Chat With Seller
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
