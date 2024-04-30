import React from 'react'
import { useDispatch } from 'react-redux';
import { updateUserWishlist } from '../../actions/userActions';
import WishListDisplay from './WishListDisplay';
import { CiSquareRemove } from 'react-icons/ci';

export default function WhislistCard({ image, name, price, id, product }) {
    const dispatch = useDispatch();

    function handleWishlist() {
        const token = JSON.parse(localStorage.getItem("userData")).token;
        dispatch(updateUserWishlist(id, token));
        window.location.reload();
    }

  return (
        <div className="d-flex flex-row flex-wrap m-3 position-relative  text-dark wishcard" style={{width:"300px",height:"400px",overflow:"hidden"}}>
            <div style={{width:"125px",overflow:"hidden"}}>
                <div className="w-100">
                <WishListDisplay product={product} image={image}/>
                </div>
            </div>
        
            <div className="ps-1 mt-5" style={{width:"175px",overflow:"hidden"}}>
              <div className="name-product fs-2">
                    <h5 className="name fs-2">
                    
                            {name.substring(0,15)} 
                      
                    </h5>
                  <p className="price text-success">
                      <span>₹ {price} {product?.cost?.negotiable && (
                          <span className="text-warning fw-bold" style={{ fontSize: "20px" }}>
                              Negotiable
                          </span>
                      
                      )}</span>
                    </p>
                  <span className="tag1"> {product?.sold && (
                      <span className="text-danger" style={{ fontSize: "20px" }}>
                          Sold Out !!
                      </span>
                  )
                  }</span>
                </div>
                <div className="description">
                  <p>{product.description.substring(0,50)+"..."}</p>
                </div>
                {/* <div className="product-info smart-form " style={{position:"absolute ",bottom:"0"}}>
                    <div className="w-100 d-flex">
                   
                        <div className='w-100' >
                          <WishListDisplay product={product} />
                        </div>
                       
                    </div>
                </div> */}
            </div>
       <div onClick={handleWishlist} className="trash-icon w-50 position-absolute removeWish" style={{top:"-3px" ,right:"-114px",cursor:"pointer",width:"30px",height:"40px"}}>
        <CiSquareRemove className='text-danger fs-1' />
          </div>
        </div>
  )
}
