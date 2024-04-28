import { useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUserProducts } from "../../actions/productActions";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/common/Loader";
import UpdateUser from "../../components/user/UpdateUser";
import ChangePassword from "../../components/user/ChangePassword";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router";
import DeleteAccount from "../../components/user/DeleteAccount";
import UserPrductDeleteModel from "../../components/product/UserPrductDeleteModel";
import AdminEditProductModel from "../../components/product/AdminEditProductModel";
import Footer from "../../components/common/Footer";

const UserUpdateScreen = () => {
  const navigate = useNavigate();
  let i = 1;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  let { userData } = userLogin; // Ensure userData is mutable
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success } = productUpdate;

  const userProductList = useSelector((state) => state.productUser);
  const { products, loading: loadinglist } = userProductList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
    dispatch(listUserProducts(userData.token));
  }, [userData, successDelete, success]);

  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100px" }}></div>
      <div className="py-3 " style={{ minHeight: "100vh" }}>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            {loadinglist ? (
              <Loader />
            ) : (
              <>
                <h3>My Uploads</h3>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="table-sm"
                  variant="danger"
                >
                  <thead>
                    <tr>
                      <th>SN</th>
                      {/* <th>ID</th> */}
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Negotiable</th>
                      <th>Sold</th>
                      <th>Created On</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData &&
                      products &&
                      products.length !== 0 &&
                      products.map(
                        (product) =>
                          product &&
                          product.owner?._id === userData._id && (
                            <tr key={product._id}>
                              <td>{i++}</td>
                              <td style={{ textTransform: "uppercase" }}>
                                {product.name}
                              </td>
                              <td>{product?.cost?.price}</td>
                              <td>
                                {product?.cost?.negotiable ? (
                                  <i
                                    className="fas fa-check"
                                    style={{ color: "green" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fas fa-times"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </td>
                              <td>
                                {product?.sold ? (
                                  <i
                                    className="fas fa-check"
                                    style={{ color: "green" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fas fa-times"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </td>
                              <td>
                                {new Date(product.createdAt).toLocaleString()}
                              </td>
                              <td>
                                <LinkContainer
                                  to={`/admin/product/${product._id}/edit`}
                                >
                                  <AdminEditProductModel product={product} />
                                </LinkContainer>
                                <UserPrductDeleteModel
                                  productId={product._id}
                                />
                              </td>
                            </tr>
                          )
                      )}
                  </tbody>
                </Table>
              </>
            )}
          </Col>
          <Col md={2}></Col>
          <Col md={8}></Col>
        </Row>

        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <h3>Setting</h3>
            <table className="m-2 w-100">
              <tr className="mb-4">
                <td>Edit your Details</td>
                <td>
                  <UpdateUser currUser={userData} />
                </td>
              </tr>
              <tr>
                <hr></hr>
              </tr>
              <tr>
                <td>Change Password</td>
                <td>
                  <ChangePassword />
                </td>
              </tr>
              <tr>
                <hr></hr>
              </tr>
              <tr>
                <td>Delete Account</td>
                <td>
                  <DeleteAccount />
                </td>
              </tr>
              <tr>
                <hr></hr>
              </tr>
            </table>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default UserUpdateScreen;
