import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { GoDot, GoDotFill } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import { updateUserWishlist } from "../actions/userActions";
import { Link } from "react-router-dom";

export default function WishListDisplay({ product }) {
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

    const isWishlisted = (wishlist && wishlist.length > 0) ? wishlist?.some(item => item._id === product._id) : false;

    function handleWishlist() {
        dispatch(updateUserWishlist(product._id, userData.token))
        window.location.reload();
    }

    console.log(product);
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
    function handleSubmit(e) {
        e.preventDefault();

        handleClose();
    }


    return (
        <>
            <Button className="round-btn small-btn bg-light text-dark" style={{ width: "30px" }} onClick={handleShow}>
                <FaEye />
            </Button>

            <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
                <Modal.Header closeButton className="bg-secondary " >
                    <Modal.Title className="text-white">Product</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light ">




                    <section class="">
                        <div class="container">
                            <div class="row gx-5 d-flex flex-warp">
                                <aside class="col-lg-6">
                                    <div class="border rounded-4 mb-3 d-flex justify-content-center">
                                        <a data-fslightbox="mygalley" class="rounded-4" target="_blank" data-type="image" href={images[ind]}>
                                            <img style={{ maxWidth: "100%", height: "300px", padding: "10px", minWidth: "250px" }} class="rounded-4 fit" src={images[ind]} />
                                        </a>
                                    </div>
                                    <div class="d-flex justify-content-center mb-3 flex-column align-items-center">
                                        <div className="d-flex ">
                                            <p>{images.map((ele, loc) => (loc == ind) ? <GoDot /> : <GoDotFill />)}</p>
                                        </div>
                                        <div>
                                            <div className="btn btn-lg"><MdArrowBackIos onClick={prevImage} /></div>
                                            <div className="btn btn-lg"><MdArrowForwardIos onClick={nextImage} /></div>
                                        </div>
                                        {/* <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big1.webp" >
                                            <img width="60" height="60" class="rounded-2" src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big1.webp" />
                                        </a>
                                        <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big2.webp" >
                                            <img width="60" height="60" class="rounded-2" src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big2.webp" />
                                        </a>
                                        <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big3.webp" >
                                            <img width="60" height="60" class="rounded-2" src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big3.webp" />
                                        </a>
                                        <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big4.webp" >
                                            <img width="60" height="60" class="rounded-2" src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big4.webp" />
                                        </a>
                                        <a data-fslightbox="mygalley" class="border mx-1 rounded-2" target="_blank" data-type="image" href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp" >
                                            <img width="60" height="60" class="rounded-2" src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp" />
                                        </a> */}
                                    </div>
                                </aside>
                                <main class="col-lg-6">
                                    <div >
                                        <h4 class="title text-success fs-1">
                                            {product.name} <br />

                                        </h4>
                                        <div class="d-flex flex-row my-3">

                                        </div>
                                        <div class="d-flex">
                                            <dt class="col-6">Seller Name:</dt>
                                            <dd class="col-6">{product?.owner?.username}</dd>
                                        </div>

                                        <div class="mb-3">
                                            <span class="h3 ">₹ {product?.cost?.price}</span>
                                            <span class="text-muted"> {product?.cost?.negotiable && <li> (Negotiable)</li>}</span>
                                        </div>

                                        <p>
                                            {product.description}
                                        </p>
                                    </div>

                                </main>
                            </div>
                        </div>
                    </section>




                </Modal.Body>
                <Modal.Footer className="bg-light ">
                    {isWishlisted ?
                        <Button variant="success"  onClick={handleWishlist}>
                            Remove from wishList
                        </Button> : <Button variant="danger" onClick={handleWishlist}>
                            Add to wishList
                        </Button>}
                    {isYourProduct ? <Button variant="primary" disabled>
                        Your Product
                    </Button> : <Button variant="primary">
                            <Link to={`/chatScreen/${product?.owner?._id}`} >  Chat With Seller</Link>
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}


