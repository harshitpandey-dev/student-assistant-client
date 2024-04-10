import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

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
      ></Form.Control>
      <Button type="submit" variant="success" className="ms-2">
        Search
      </Button>
     
    </Form>
    </div>
  );
};

export default SearchBox;
