import React from "react";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";


const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar className="Nav_Bar"  expand="lg" collapseOnSelect style={{ height: "auto", backgroundColor: "#8991E4", fontFamily:"'Gluten', sans-serif"}}>
        <Container>
          <LinkContainer to="/home">
            <Navbar.Brand className="text-light">Student-Assistant</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
           

            <Nav className="ml-auto">
              {userData ? (
                <NavDropdown
                  title={`Signed in as ${userData.name}`}
                  id="username"
                >
                  <LinkContainer to={`/admin/users/${userData._id}/edit`}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
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
                  About Us
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>


   
  );
};

export default Header;


