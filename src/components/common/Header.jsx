import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;
  const location = useLocation();
  var currentURL = location.pathname;
  var url = currentURL.split("/");
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    currentURL = window.location.href;
    url = currentURL.split("/");
    setHide(false);
    if (
      url.includes("chatScreen") ||
      url.includes("product") ||
      url.includes("admin") ||
      url.includes("users") ||
      url.includes("wishlist") ||
      url.includes("about") ||
      url.includes("createproduct")
    ) {
      setHide(true);
    }
  }, [location]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header>
      <Navbar
        className="Nav_Bar"
        expand="lg"
        collapseOnSelect
        style={{
          height: "auto",
          backgroundColor: "#8991E4",
          fontFamily: "sans-serif",
        }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-light">
              <span style={{ fontFamily: "'Gluten', sans-serif" }}>
                Student-Assistant
              </span>
            </Navbar.Brand>
          </LinkContainer>
            {hide ? <></> : <SearchBox className="w-100 h-100" />}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className="ml-auto text-center d-flex align-items-center">
              <Link
                to="/createproduct"
                className="btn text-white btn-circle btn-circle-sm m-1 style-btn"
              >
                <IoIosAddCircle /> Sell
              </Link>
              <Link
                to="/wishlist"
                className="btn text-light btn-circle btn-circle-sm m-1 style-btn-wishlist style-btn"
              >
                <FaRegHeart /> Wishlist
              </Link>
              {userData && userData.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  {/* <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}

              <LinkContainer to="/about">
                <Nav.Link>
                  {/* <i className='far fa-address-card'></i>  */}
                  <span>About Us</span>
                </Nav.Link>
              </LinkContainer>
              {userData ? (
                <>
                  <NavDropdown title={`${ userData.fullname}`} id="username">
                    <LinkContainer to={`/users/${userData._id}`}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={`/chatScreen/`}>
                      <NavDropdown.Item>Chat</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
