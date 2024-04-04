import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import Header from '../components/Header'
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../types/productConstants";
import { useParams } from 'react-router-dom'

export default function Landing() {
    const match=useParams();

    var pageNumber = match.pageNumber || 1;
    var keyword = match.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
   
     dispatch(listProducts(keyword, pageNumber));
   
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
    <Header />
    <div className="py-4 container-fluid p-5">
      <Meta />
      {keyword && (
        <Link className="btn btn-success" to="/">
          Go Back
        </Link>
      )}
      <Row className="align-items-center">
        <Col xs={6}>
            <h3 style={{ fontFamily: "'Gluten', sans-serif", color:"#8991E4"}}> Latest Items On Sale</h3>
        </Col>
        <Col className="text-right">
          <LinkContainer to= {userData?"/createproduct":"/login"}>
              <div className="btn btn-danger" >
              <i style={{ color: "white" }} className="fas fa-plus"></i>{" "}
              <span className="textcolor" >List Your Property</span>
            </div>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            className="paginate"
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
    </>
  )
}
