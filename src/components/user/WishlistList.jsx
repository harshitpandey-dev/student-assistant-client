import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { updateUserWishlist } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import WishListDisplay from "../user/WishListDisplay";

export default function WishlistList({ image, name, price, id, product }) {
  const dispatch = useDispatch();

  function handleWishlist() {
    const token = JSON.parse(localStorage.getItem("userData")).token;
    dispatch(updateUserWishlist(id, token));
    window.location.reload();
  }

  return (
    <tr className=" text-center">
      <td width="25%" className="">
        <div
          className="display-flex align-items-center justify-content-flex-start"
          style={{ width: "auto" }}
        >
          {/* <div className="img-product">
            <img src={image} alt="" className="mCS_img_loaded" style={{width:"200px",height:"270px"}}/>
          </div> */}
          <div
            className="name-product fs-2 "
            style={{ textTransform: "uppercase" }}
          >
            {name}
          </div>
        </div>
      </td>
      <td
        width="45%"
        style={{minWidth:"150px"}}
        className="price  text-center justify-content-center align-center text-success  "
      >
        ₹ {price}
      </td>
      <td
        width="15%"
        className="price fs-2 text-center justify-content-center align-center text-success  "
      >
        {product?.cost?.negotiable ? (
          <span className="text-secondary fw-bold" style={{ fontSize: "20px" }}>
            Yes
          </span>
        ) : (
          <span className="text-secondary" style={{ fontSize: "20px" }}>
            No
          </span>
        )}
      </td>
      <td
        width="15%"
        className="price fs-2 text-center justify-content-center align-center text-success  "
      >
        {product?.sold ? (
          <span className="text-danger" style={{ fontSize: "20px" }}>
            Sold
          </span>
        ) : (
          <span className="text-success" style={{ fontSize: "20px" }}>
            Unsold
          </span>
        )}
      </td>
      <td width="5%">
        <div className=" h-100 d-flex align-center">
          <WishListDisplay product={product} />
        </div>
      </td>
      <td width="5%" className=" h-100  " style={{ cursor: "pointer" }}>
        <div className=" h-100 d-flex align-items-center justify-content-center">
          <div onClick={handleWishlist} className="trash-icon h-100">
            <i className="far fa-trash-alt"></i>
          </div>
        </div>
      </td>
    </tr>
  );
}
