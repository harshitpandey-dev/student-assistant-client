import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router'
const EmailVerificationScreen = ({ location }) => {
  const navigate=useNavigate()
  const match=useParams();

    var token = match.token

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { userData, loading, error } = userRegister
  // const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userData) {
      navigate(redirect)
    }
    dispatch(register(token))
  }, [ userData, redirect, token])

  return (
    <>
    <Header />
    <div className='py-3'>
    <Row>
      <Col md={2}></Col>
      <Col md={6}>
        <Message variant='primary'>Waiting for the confirmation....</Message>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
      </Col>
      <Col md={2}></Col>
    </Row>
      </div>
    </>
  )
}

export default EmailVerificationScreen
