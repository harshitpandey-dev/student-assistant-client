import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row style={{padding:"10px"}}>
          <Col className='text-center'>
            Copyright &copy; 2022 
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
