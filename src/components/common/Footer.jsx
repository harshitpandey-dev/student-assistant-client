import { useSelector } from "react-redux";

const Footer = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;
  return (
    <>
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#1c2331" }}
      >
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Company name</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Social Media</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <a href="" className="text-white me-4">
                    <i className="fab fa-facebook-f"></i>
                  </a>

                  <a href="" className="text-white me-4">
                    <i className="fab fa-twitter"></i>
                  </a>
                </p>
                <p>
                  <a href="" className="text-white me-4">
                    <i className="fab fa-google"></i>
                  </a>
                  <a href="" className="text-white me-4">
                    <i className="fab fa-instagram"></i>
                  </a>
                </p>
                <p>
                  <a href="" className="text-white me-4">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="" className="text-white me-4">
                    <i className="fab fa-github"></i>
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  {userData && (
                    <a href={`/users/${userData._id}`} className="text-white">
                      Your Profile
                    </a>
                  )}
                </p>
                <p>
                  <a href="/chatScreen" className="text-white">
                    Your Chats
                  </a>
                </p>
                <p>
                  <a href="/about" className="text-white">
                    About Us
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@example.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright
        </div>
      </footer>

      {/* // <footer>
    //   <Container>
    //     <Row style={{ padding: "10px" }}>
    //       <Col classNameName='text-center'>
    //         Copyright &copy; 2022
    //       </Col>
    //     </Row>
    //   </Container>
    // </footer> */}
    </>
  );
};

export default Footer;
