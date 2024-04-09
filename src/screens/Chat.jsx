import React, { useEffect } from 'react'
import Header from '../components/Header'
import SellerMessage from '../components/SellerMessage'
import UserMessage from '../components/UserMessage'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { get_Chat } from '../actions/chatActions'
import { getMessage, postMessage } from '../actions/messageAction'
import { useState } from 'react'
import { CHAT_RESET } from '../types/chatConstants'
import { MESSAGE_RESET } from '../types/messageConstants'

export default function Chat() {
  const match=useParams();
  const sellerID=match.sellerID;
  const navigate=useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    var { userData } = userLogin;
  const getCHAT = useSelector((state) => state.getChat);
  var { chatData,loading } = getCHAT;
  const Message = useSelector((state) => state.getMessage);
  var { messageData } = Message;

  const [sendMessage,setSendMessage]=useState("");


  useEffect(()=>{
      dispatch({type:CHAT_RESET})
      dispatch({type:MESSAGE_RESET})
  },[])


    useEffect(()=>{
     
          if(localStorage.getItem('userData')){
            userData=JSON.parse(localStorage.getItem('userData'))
          }else{
            navigate("/login")
            return;
          }
          if(!chatData){
            dispatch(get_Chat(sellerID,userData.token))
          }
          if(chatData){
            dispatch(getMessage(chatData._id,userData.token))
          }
          
    },[dispatch,sellerID,userData,loading,chatData])

    function handleSubmit(e){
      e.preventDefault();
      if(sendMessage!==""){
      const formData = new FormData();
      formData.append("content",sendMessage)
        dispatch(postMessage(chatData._id,formData,userData.token))
        setSendMessage("")
        dispatch(getMessage(chatData._id, userData.token))
      }
    }


    return (
        <>
        <Header />
        {loading ? <Loader /> :
            <div className="container-fluid d-flex justify-content-center vw-100 vh-100">
            <div className="wrapper vw-100 vh-100">
                <div className="main">
                    <div className="px-2 scroll">
                    {messageData && messageData.map((msg)=>{
                       if(msg.sender._id === userData._id)
                        return <UserMessage msg={msg} key={msg._id}/>
                       else return <SellerMessage msg={msg} key={msg._id} />
                    })}
                        
                    </div>
                <form onSubmit={handleSubmit} className='navbar bg-white navbar-expand-sm d-flex justify-content-center w-100'>
                  <input type="text" name="text" className="form-control w-100" value={sendMessage} onChange={(e) => setSendMessage(e.target.value)} placeholder="Type a message..." />
                  <button type='submit' className='w-50 p-3'><i className="fa fa-arrow-circle-right icon2"></i></button>
                        </form>
                </div>
            </div>
            </div>
        }
        </>

            )
}
