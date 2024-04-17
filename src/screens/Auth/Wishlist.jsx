import React, { useEffect } from 'react'
import WishlistList from '../../components/WishlistList'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { USER_WISHLIST_RESET } from '../../types/userConstants';
import { getUserWishlist } from '../../actions/userActions';


export default function Wishlist() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    var { userData } = userLogin;
    const getWishlist = useSelector((state) => state.userWishlist);
    var { wishlist, loading } = getWishlist;

    useEffect(() => {
        dispatch({ type: USER_WISHLIST_RESET });
    }, []);


    useEffect(()=>{
        if(localStorage.getItem('userData')){
               userData=JSON.parse(localStorage.getItem('userData'))
        }else{
            navigate("/login")
        }
        if(userData){
            dispatch(getUserWishlist(userData.token));
        }
    },[userData])

  return (
    <div>
          <div class="cart-wrap">
              <div class="container">
                  <div class="row">
                      <div class="col-md-12">
                          <div class="main-heading mb-3 text-center fs-2" style={{ fontFamily: "'Gluten', sans-serif", color:"#8991E4"}}>My wishlist</div>
                          <div class="table-wishlist">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                  <thead>
                                      <tr>
                                          <th width="45%">Product Name</th>
                                          <th width="15%">Unit Price</th>
                                          {/* <th width="15%">Stock Status</th> */}
                                          <th width="5%"></th>
                                          <th width="10%"></th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {wishlist && wishlist.map((list,ind)=>{
                                        return <WishlistList />
                                      })}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

    </div>
  )
}
