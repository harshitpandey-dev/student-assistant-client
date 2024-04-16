import React from 'react'
import WishlistList from '../../components/WishlistList'

export default function Wishlist() {
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
                                      <WishlistList />
                                      <WishlistList />
                                      <WishlistList />
                                      <WishlistList />
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
