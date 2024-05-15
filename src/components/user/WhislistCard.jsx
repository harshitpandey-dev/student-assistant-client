/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { updateUserWishlist } from "../../actions/userActions";
import WishListDisplay from "./WishListDisplay";
import { CiSquareRemove } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function WhislistCard({ image, name, price, id, product }) {
  const dispatch = useDispatch();

  function handleWishlist() {
    const token = JSON.parse(localStorage.getItem("userData")).token;
    dispatch(updateUserWishlist(id, token));
    window.location.reload();
  }

  return (
    <div
      className="d-flex flex-row flex-wrap m-3 position-relative  text-dark wishcard"
      style={{ width: "510px", height: "400px", maxWidth: "100vw" }}
    >
      <div className="fix-img">
        <div className="fix-img">
          <WishListDisplay product={product} image={image} />
        </div>
      </div>

      <div
        className=" d-flex flex-column align-items-center justify-content-center fix-right"
        style={{ width: "345px", maxWidth: "100vw" }}
      >
        <div className="name-product fs-2">
          <h5 className="name fs-2">{name}</h5>
          <p className="price text-success">
            <span>
              ₹ {price}{" "}
              {product?.cost?.negotiable && (
                <span
                  className="text-warning fw-bold"
                  style={{ fontSize: "10px" }}
                >
                  Negotiable
                </span>
              )}
            </span>
          </p>
          <span className="tag1">
            {" "}
            {product?.sold && (
              <span className="text-danger" style={{ fontSize: "10px" }}>
                Sold Out !!
              </span>
            )}
          </span>
        </div>
        <div className="description">
          <p>{product?.keywords?.substring(0, 50)}</p>
        </div>
        {/* <div className="product-info smart-form " style={{position:"absolute ",bottom:"0"}}>
                    <div className="w-100 d-flex">
                   
                        <div className='w-100' >
                          <WishListDisplay product={product} />
                        </div>
                       
                    </div>
                </div> */}
      </div>
      <div
        onClick={handleWishlist}
        className="trash-icon  position-absolute removeWish"
        style={{
          top: "-3px",
          right: "10px",
          cursor: "pointer",
          width: "30px",
          height: "40px",
        }}
      >
        <CiSquareRemove className="text-danger fs-1" />
      </div>
      <div
        className=" position-absolute button-3 fix-btn"
        style={{ bottom: "10px", right: "10px", cursor: "pointer" }}
      >
        {/* <div className="button-3 resp text-light ms-2" style={{ width: "40%" }}> */}
        {
          <Link to={`/chatScreen/${product?.owner}`}>
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
            <span style={{ fontSize: "12px" }}> Chat With Seller</span>
          </Link>
        }
        {/* </div> */}
      </div>
    </div>
  );
}
