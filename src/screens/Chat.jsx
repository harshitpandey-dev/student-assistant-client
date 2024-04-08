import React, { useEffect } from 'react'
import Header from '../components/Header'
import SellerMessage from '../components/SellerMessage'
import UserMessage from '../components/UserMessage'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";

export default function Chat() {

  const navigate=useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userData } = userLogin;

    useEffect(()=>{
          if(localStorage.getItem('userData')){
            userData=JSON.parse(localStorage.getItem('userData'))
          }else{
            navigate("/login")
          }
          

    },[])
    return (
        <>
        <Header />
            <div className="container-fluid d-flex justify-content-center vw-100 vh-100">
            <div className="wrapper vw-100 vh-100">
                <div className="main">
                    <div className="px-2 scroll">
                        <SellerMessage />
                        <SellerMessage />
                        <UserMessage />
                        <SellerMessage />
                    </div>
                    <nav className="navbar bg-white navbar-expand-sm d-flex justify-content-center"> <input type="text" name="text" className="form-control setWidth" placeholder="Type a message..." />
                        <div className="icondiv d-flex justify-content-end align-content-center text-center ml-2"> <button className='btn '><i className="fa fa-arrow-circle-right icon2"></i> </button></div>
                    </nav>
                </div>
            </div>
            </div>
        </>

            )
}
