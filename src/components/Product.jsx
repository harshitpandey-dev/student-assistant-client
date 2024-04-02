import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Product = ({ product }) => {
  return (
    <>
      <Card className='my-3 p-3 rounded product-card'>
        <Link to={`/product/${product._id}`}>
          <Card.Img className='card-image' src={product.images[0].image1} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='p' className='name-label'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='h3' className='text-success ' style={{ fontSize: "33px", fontWeight: "bold" }}>Rs {product.Cost.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
