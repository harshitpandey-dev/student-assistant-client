import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getUserWishlist, updateUserWishlist } from '../actions/userActions';
const Product = ({product,userID,token}) => {
  const dispatch=useDispatch();
  
  const getWishlist = useSelector((state) => state.userWishlist);
  var { wishlist } = getWishlist;
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  useEffect(()=>{
    if (userData) {
      dispatch(getUserWishlist(userData.token));
    }
  },[])

  const isYourProduct =userID===product.owner?._id;

  const isWishlisted = (wishlist && wishlist.length>0) ?wishlist?.some(item => item._id === product._id):false;

  function handleWishlist(){
    dispatch(updateUserWishlist(product._id,token))
    window.location.reload();
  }
  
  return (
    <>
      <Card className='my-3 p-3 rounded product-card'>
        {/* <Link to={`/product/${product._id}`}> */}
          <Card.Img className='card-image'style={{height:"300px"}} src={product.images[0]} />
        {/* </Link> */}
        <Card.Body className='d-flex flex-column align-items-center w-100'>
       
          {/* <Link to={`/product/${product._id}`}> */}
            <Card.Title as='p' className='name-label'>
              <strong>{product.name}</strong>
              
            </Card.Title>
            {/* <p style={{ fontFamily: "'Gluten', sans-serif" }}>{product?.description}</p> */}
          {/* </Link> */}
          <Card.Text as='h3' className='text-success ' style={{ fontSize: "33px", fontWeight: "bold" }}>₹ {product.cost.price} {product?.cost?.negotiable && <span className='text-secondary' style={{fontSize:"15px"}}> (Negotiable)</span>} </Card.Text>
          <div className='d-flex mt-3 flex-wrap flex-column'>
            {isYourProduct ? (
              <>
                {/* <a className='btn style-btn style-btn-chat  text-light' style={{cursor:"default"}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="30px" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                </svg>
                Your Product
              </a>
                <Link onClick={handleWishlist} className={isWishlisted ? "btn text-light bg-success btn-circle btn-circle-sm m-1 style-btn-wishlist-pro style-btn" : "btn text-light bg-danger btn-circle btn-circle-sm m-1 style-btn-wishlist-pro style-btn"} >
                  <FaRegHeart /> {isWishlisted ?"Remove": "wishlist"}
              </Link> */}
                <Link className='button-3a text-light w-100 mb-4' style={{cursor:"default"}} >
                
                Your Product
              </Link>
                <Link onClick={handleWishlist} className={isWishlisted ? "button-2a w-100 text-light" : "button-2 w-100 text-light"} >
                  <FaRegHeart /> {isWishlisted ?"Remove": "wishlist"}
              </Link>
              </>
            ) : (
              <>
                  {/* <Link to={`/chatScreen/${product.owner?._id}`} className='btn text-light style-btn style-btn-chat  text-light'>
                <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="30px" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                </svg>
                Chat with seller
              </Link>
                  <Link onClick={handleWishlist} className={isWishlisted ? "btn text-light bg-success btn-circle btn-circle-sm m-1 style-btn-wishlist-pro style-btn" : "btn text-light bg-danger btn-circle btn-circle-sm m-1 style-btn-wishlist-pro style-btn"}  >
                    <FaRegHeart /> {isWishlisted ? "Remove" : "wishlist"}
              </Link> */}
                  <Link to={`/chatScreen/${product.owner?._id}`} className='button-3 w-100 mb-4 text-light'>
                <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="30px" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                </svg>
                Chat with seller
              </Link>
                  <Link onClick={handleWishlist} className={isWishlisted ? "button-2a w-100 text-light" : "button-2 w-100 text-light"}  >
                    <FaRegHeart /> {isWishlisted ? "Remove" : "wishlist"}
              </Link>
                </>
            )}

          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
