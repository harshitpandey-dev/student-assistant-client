import React from 'react'
import { useDispatch } from 'react-redux';
import { updateUserWishlist } from '../../actions/userActions';
import WishListDisplay from './WishListDisplay';

export default function WhislistCard({ image, name, price, id, product }) {
    const dispatch = useDispatch();

    function handleWishlist() {
        const token = JSON.parse(localStorage.getItem("userData")).token;
        dispatch(updateUserWishlist(id, token));
        window.location.reload();
    }

  return (
        <div class="d-flex flex-row flex-wrap m-3 position-relative bg-secondary text-light" style={{width:"350px"}}>
            <div style={{width:"150px",overflow:"hidden"}}>
                <div class="w-100">
                  <img src={image} alt="194x228" class="img-responsive " style={{width:"150px" ,height:"300px"}} />
                </div>
            </div>
        
            <div class="ps-1" style={{width:"200px",overflow:"hidden"}}>
              <div class="name-product fs-2 text-light">
                    <h5 class="name fs-4">
                    
                            {name} 
                      
                    </h5>
                  <p class="price text-dark">
                      <span>₹ {price} {product?.cost?.negotiable && (
                          <span className="text-warning fw-bold" style={{ fontSize: "20px" }}>
                              Negotiable
                          </span>
                      
                      )}</span>
                    </p>
                  <span class="tag1"> {product?.sold && (
                      <span className="text-danger" style={{ fontSize: "20px" }}>
                          Sold Out !!
                      </span>
                  )
                  }</span>
                </div>
                <div class="description">
                  <p>{product.description.substring(0,50)+"..."}</p>
                </div>
                <div class="product-info smart-form " style={{position:"absolute ",bottom:"0"}}>
                    <div class="w-100 d-flex">
                   
                        <div className='w-100' >
                          <WishListDisplay product={product} />
                        </div>
                       
                    </div>
                </div>
            </div>
       <div onClick={handleWishlist} className="trash-icon h-100 w-50 position-absolute " style={{top:"0" ,left:"0",cursor:"pointer"}}>
              <i className="far fa-trash-alt bg-light p-2"></i>
          </div>
        </div>
  )
}
