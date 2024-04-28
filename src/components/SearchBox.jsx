import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const navigate=useNavigate();
  const [keyword, setKeyword] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="d-flex flex-row justify-content-center w-100 mt-4">
    <Form onSubmit={submitHandler} style={{display:"flex"}} >
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        style={{height:"50px",borderRadius:"0.375rem 0 0 0.375rem"}}
      ></Form.Control>
        <Button type="submit" variant="light" className="" style={{ height: "50px", width: "40px", color: "#8991E4", borderRadius: "0 0.375rem 0.375rem 0" }}>
        <FaSearch />
      </Button>
     
    </Form>
    </div>
  );
};

export default SearchBox;
