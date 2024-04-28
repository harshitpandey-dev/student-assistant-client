import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table } from "react-bootstrap";
import Paginate from "../../components/product/Paginate";

import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import { listProducts } from "../../actions/productActions";
import Header from "../../components/common/Header";
import { useNavigate, useParams } from "react-router";
import AdminProductDeleteModel from "../../components/product/AdminProductDeleteModel";
import AdminEditProductModel from "../../components/product/AdminEditProductModel";
import Footer from "../../components/common/Footer";

const ProductListScreen = () => {
  const navigate = useNavigate();
  const match = useParams();
  var pageNumber = match.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;
  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;
  var i = 1;
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    } else {
      navigate("/login");
    }
    if (userData && userData.isAdmin) {
      dispatch(listProducts("", pageNumber));
    } else {
      navigate("/");
    }
  }, [dispatch, successDelete, userData, pageNumber]);

  // const deleteHandler = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     dispatch(deleteProduct(id));
  //   }
  // };

  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100px" }}></div>
      <div
        className="py-3 d-flex flex-column p-2"
        style={{ minHeight: "100vh" }}
      >
        <h1
          className="text-center pb-2 "
          style={{ fontFamily: "serif", color: "#8991E4" }}
        >
          Products
        </h1>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  {/* <th>ID</th> */}
                  <th>NAME</th>
                  <th>PRICE</th>
                  {/* <th>CATEGORY</th> */}
                  <th>OWNER</th>
                  <th>CREATED ON</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) =>
                  product.owner ? (
                    <tr key={product._id}>
                      <td>{i++}</td>
                      {/* <td>{product._id}</td> */}
                      <td style={{ textTransform: "uppercase" }}>
                        {product.name}
                      </td>
                      <td>Rs {product.cost.price}</td>
                      {/* <td>{product.category}</td> */}
                      <td>{product.owner?.fullname}</td>
                      <td>{product.createdAt.substring(0, 10)}</td>
                      <td>{product?.sold ? "Sold" : "Unsold"}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <AdminEditProductModel product={product} />
                        </LinkContainer>
                        <AdminProductDeleteModel productId={product._id} />
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )
                )}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductListScreen;
