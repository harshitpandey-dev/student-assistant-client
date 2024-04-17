import React from 'react'
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { updateUserWishlist } from '../actions/userActions';
import { useDispatch } from 'react-redux';


export default function WishlistList({image,name,price,id}) {
   const dispatch=useDispatch();

    function handleWishlist() {
        const token=JSON.parse(localStorage.getItem('userData')).token;
        dispatch(updateUserWishlist(id, token))
        window.location.reload();
    }

  return (
          <tr>
              <td width="45%">
                  <div className="display-flex align-center">
                      <div className="img-product">
                          <img src={image} alt="" className="mCS_img_loaded" />
                      </div>
                      <div className="name-product">
                          {name}
                      </div>
                  </div>
              </td>
          <td width="15%" className="price">₹ {price}</td>
              {/* <td width="15%"><span className="in-stock-box">In Stock</span></td> */}
          <td width="5%"><Link to={`/product/${id}`} className="round-btn small-btn bg-light text-dark" style={{width:"30px"}}><FaEye /></Link></td>
          <td width="10%" className="text-center round-btn small-btn" style={{cursor:"pointer"}}><a  onClick={handleWishlist} className="trash-icon"><i className="far fa-trash-alt"></i></a></td>
          </tr>
  
  )
}
