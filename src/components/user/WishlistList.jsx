import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { updateUserWishlist } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import WishListDisplay from "../WishListDisplay";

export default function WishlistList({ image, name, price, id ,product}) {
  const dispatch = useDispatch();

  function handleWishlist() {
    const token = JSON.parse(localStorage.getItem("userData")).token;
    dispatch(updateUserWishlist(id, token));
    window.location.reload();
  }

  return (
    <tr className="w-100 text-center">
      <td width="45%" className="">
        <div className="display-flex align-items-center justify-content-flex-start">
          {/* <div className="img-product">
            <img src={image} alt="" className="mCS_img_loaded" style={{width:"200px",height:"270px"}}/>
          </div> */}
          <div className="name-product fs-2 text-secondary">{name}</div>
        </div>
      </td>
      <td width="15%"  className="price fs-2 d-flex flex-row text-center justify-content-center align-center text-success w-100 ">
              
        ₹ {price} {product?.cost?.negotiable && <span className='text-secondary' style={{ fontSize: "15px" }}> (Negotiable)</span>}
      </td>
      <td width="5%"  >
       <div className="w-100 h-100 d-flex align-center">
        <WishListDisplay product={product}/>

       </div>


      </td>
      <td
        width="10%" 
        className=" h-100  "
        style={{ cursor: "pointer" }}
      >
      <div className="w-100 h-100 d-flex align-items-center justify-content-center" >
        <div onClick={handleWishlist} className="trash-icon h-100">
          <i className="far fa-trash-alt"></i>
        </div>

      </div>
      </td>
    </tr>
  );
}
