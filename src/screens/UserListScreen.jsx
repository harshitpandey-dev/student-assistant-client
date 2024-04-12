import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Header from '../components/Header'
import { listUsers, deleteUser, login } from '../actions/userActions'
import { useNavigate } from 'react-router'
const UserListScreen = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch()
  const usersList = useSelector((state) => state.usersList)
  const { users, loading, error } = usersList
  const userLogin = useSelector((state) => state.userLogin)
  var { userData } = userLogin
  const userDelete = useSelector((state) => state.userDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = userDelete
  var i = 1
  useEffect(() => {
   if(localStorage.getItem('userData')){
      userData=JSON.parse(localStorage.getItem('userData'))
   }else{
    navigate("/login")
   }  
    if (userData && userData.isAdmin) {
      dispatch(listUsers(userData.token))
    } else {
      navigate('/')
    }
  }, [dispatch,  successDelete, userData])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
    <Header />
    <div className='py-3 d-flex flex-column p-2'>
        <h1 className='text-center pb-2 ' style={{ fontFamily: "'Gluten', sans-serif", color: "#8991E4"}}>Users</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading ? ( 
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>SN</th>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id}>
                <td>{i++}</td>
                <td>{user._id}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.contact.phone_no}</td>
                <td>{user.address}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                    style={{ width: "30px", height: "30px" }}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )} 
      </div>
    </>
  )
}

export default UserListScreen
