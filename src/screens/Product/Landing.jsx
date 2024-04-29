import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Loader from "../../components/common/Loader";
import Message from "../../components/common/Message";
import Paginate from "../../components/product/Paginate";
import Meta from "../../components/common/Meta";
import { listUnsoldProducts } from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../types/productConstants";
import { useParams } from "react-router-dom";
import { getUserWishlist } from "../../actions/userActions";
import { USER_WISHLIST_RESET } from "../../types/userConstants";
import Header from "../../components/common/Header";
import ProductDispay from "../../components/product/ProductDispay";
import Footer from "../../components/common/Footer";

export default function Landing() {
  const match = useParams();

  var pageNumber = match.pageNumber || 1;
  var keyword = match.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: USER_WISHLIST_RESET });

    
    dispatch(listUnsoldProducts());

    if (userData) {
      dispatch(getUserWishlist(userData.token));
    }
  }, [dispatch, keyword, pageNumber, userData]);

  const startIndex = (pageNumber - 1) * 10;
  const endIndex = pageNumber * 10;
  var productsForPage = products?.slice(startIndex, endIndex);
  var pages = Math.ceil(products?.length / (endIndex - startIndex));

  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100px" }}></div>
      <div className="py-4 container-fluid p-5 " style={{ minHeight: "100vh" }}>
        <Meta />
        {keyword && (
          <Link className="btn btn-success" to="/">
            Go Back
          </Link>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="d-flex justify-content-center align-items-center text-secondary fs-4" style={{minHeight:"100vh"}}>No product listed yet !!</p>
        ) : (
          <>
            <Row>
              {productsForPage &&
                productsForPage.map((product) =>
                  product.owner ? (
                    <Col key={product._id} sm={12} md={6} lg={4}>
                      <ProductDispay
                        product={product}
                        userID={userData?._id}
                        token={userData?.token}
                      />
                    </Col>
                  ) : (
                    <></>
                  )
                )}
            </Row>
            <Paginate
              className="paginate"
              pages={pages}
              page={pageNumber}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
