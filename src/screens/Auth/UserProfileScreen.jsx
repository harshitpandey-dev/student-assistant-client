import { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProduct } from "../../actions/productActions";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader";
import UpdateUser from "../../components/UpdateUser";
import ChangePassword from "../../components/ChangePassword";
// import Header from "../../components/Header";
import { useNavigate } from "react-router";
import DeleteAccount from "../../components/DeleteAccount";

const UserUpdateScreen = () => {
  const navigate = useNavigate();
  let i = 1;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  let { userData } = userLogin; // Ensure userData is mutable
  // const userUpdate = useSelector((state) => state.userUpdate);
  // const { success } = userUpdate;

  const productList = useSelector((state) => state.productList);
  const { products, loading: loadinglist } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    }
    if (!userData) {
      navigate("/");
      return;
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, userData, successDelete, navigate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="py-3">
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
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Negotiable</th>
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
                              <td>{product._id}</td>
                              <td>{product.name}</td>
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
                                <LinkContainer
                                  to={`/admin/product/${product._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                </LinkContainer>
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  style={{ width: "35px", height: "30px" }}
                                  onClick={() => deleteHandler(product._id)}
                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
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
        </Row>

        <Row >
          <Col md={1}></Col>
          <Col md={4} >

            <div>Edit your Details</div>
          </Col>
          <Col md={6}>
            <UpdateUser />
          </Col>
        </Row>

        <Row>
          <Col md={1}></Col>
          <Col md={4}>
            <div >Change Password</div>
          </Col>
          <Col md={6}>
            <ChangePassword />
          </Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={4}>
            <div>Delete Account</div>
          </Col>
          <Col md={6}>
            <DeleteAccount />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserUpdateScreen;
