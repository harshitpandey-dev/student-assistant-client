import React from 'react'
import { FaEye } from "react-icons/fa";
export default function WishlistList() {
  return (
          <tr>
              <td width="45%">
                  <div class="display-flex align-center">
                      <div class="img-product">
                          <img src="https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg" alt="" class="mCS_img_loaded" />
                      </div>
                      <div class="name-product">
                          Apple iPad Mini
                      </div>
                  </div>
              </td>
              <td width="15%" class="price">$110.00</td>
              {/* <td width="15%"><span class="in-stock-box">In Stock</span></td> */}
              <td width="5%"><button class="round-btn small-btn bg-light text-dark" style={{width:"30px"}}><FaEye /></button></td>
              <td width="10%" class="text-center"><a href="#" class="trash-icon"><i class="far fa-trash-alt"></i></a></td>
          </tr>
  
  )
}
