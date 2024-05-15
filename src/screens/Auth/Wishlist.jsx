import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_WISHLIST_RESET } from "../../types/userConstants";
import { getUserWishlist } from "../../actions/userActions";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import WhislistCard from "../../components/user/WhislistCard";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Wishlist() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;
  const getWishlist = useSelector((state) => state.userWishlist);
  var { wishlist } = getWishlist;

  useEffect(() => {
    dispatch({ type: USER_WISHLIST_RESET });
  }, []);

  useEffect(() => {
    if (userData) {
      dispatch(getUserWishlist(userData.token));
    }
  }, [userData]);

  return (
    <div>
      <Header />

      <div style={{ width: "100vw", height: "100px" }}></div>
      <div className="ms-5 mt-2">
        <Link to="/" className="button-6">
          <FaHome /> Back To Home
        </Link>
      </div>
      <div className="cart-wrap " style={{ minHeight: "100vh" }}>
        <div className="p-3">
          <div className="">
            <div className="">
              <div
                className="main-heading mb-3 text-center fs-2"
                style={{ fontFamily: " serif", color: "#8991E4" }}
              >
                My wishlist
              </div>
              <div className="w-100 d-flex flex-row flex-wrap">
                {wishlist &&
                  wishlist.length > 0 &&
                  wishlist.map((list) => {
                    return (
                      <WhislistCard
                        name={list.name}
                        price={list?.cost?.price}
                        image={list?.images[0]}
                        key={list._id}
                        id={list._id}
                        product={list}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
