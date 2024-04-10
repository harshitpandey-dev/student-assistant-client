import { useEffect, useState } from "react";
import Header from "../components/Header";
import SenderMessageBox from "../components/SenderMessageBox";
import UserMessgeBox from "../components/UserMessgeBox";
import ChatUserList from "../components/ChatUserList";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { get_All_Chat, get_Chat } from '../actions/chatActions'
import { getMessage, postMessage } from '../actions/messageAction'
import { CHAT_RESET } from '../types/chatConstants'
import { MESSAGE_RESET } from '../types/messageConstants'




export default function ChatScreen() {
    const match = useParams();
    const sellerID = match.sellerID;
    const chatID = match.chatID;
    const [open, setOpen] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    var { userData } = userLogin;
    const getCHAT = useSelector((state) => state.getChat);
    var { chatData,loading } = getCHAT;
    const Message = useSelector((state) => state.getMessage);
    var { messageData } = Message;
    const chatList = useSelector((state) => state.chatList);
    var { chatListData } = chatList;
    const [sendMessage, setSendMessage] = useState("");
    const [reload,setReload]=useState(false);
    const [name,setName]=useState("")

    useEffect(() => {
        dispatch({ type: CHAT_RESET })
        dispatch({ type: MESSAGE_RESET })
    }, [])

    useEffect(() => {
     
        if (localStorage.getItem('userData')) {
            userData = JSON.parse(localStorage.getItem('userData'))
        } else {
            navigate("/login")
        }
          dispatch(get_All_Chat(userData._id,userData.token))
        if (userData._id === sellerID) {
            
            return;
        }
        if (!chatData && !chatID) {
            dispatch(get_Chat(sellerID, userData.token))
        }
        if (chatData && !chatID) {
            dispatch(getMessage(chatData._id, userData.token))
        }
        if(chatID){
            dispatch(getMessage(chatID, userData.token))
        }
        setSendMessage("")
        
    }, [dispatch, sellerID, userData, loading, chatData,chatID,reload])

  

    function handleSubmit(e) {
        e.preventDefault();
        if (sendMessage !== "") {
            const formData = new FormData();
            formData.append("content", sendMessage)
            if(chatID){
                dispatch(postMessage(chatID, formData, userData.token))
            }else{
                dispatch(postMessage(chatData._id, formData, userData.token))
            }
            
            setSendMessage("")
            setReload(!reload)
        }
    }

  

    return (
        <>
            <Header />
            {loading ?<Loader /> :
            <div className="chatScreen mt-5">
                <div className="container bootstrap snippets bootdey mt-5">
                    <div className="tile tile-alt" id="messages-main">
                        <div className={open ? "ms-menu toggled" : "ms-menu"}>
                            {/* <div className="ms-user clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar pull-left" />
                            <div>Signed in as <br/> m-hollaway@gmail.com</div>
                    </div> */}

                            {/* <div className="p-15">
                        <div className="dropdown">
                            <a className="btn btn-primary btn-block" href="" data-toggle="dropdown">Messages <i className="caret m-l-5"></i></a>

                            <ul className="dropdown-menu dm-icon w-100">
                                <li><a href=""><i className="fa fa-envelope"></i> Messages</a></li>
                                <li><a href=""><i className="fa fa-users"></i> Contacts</a></li>
                                <li><a href=""><i className="fa fa-format-list-bulleted"> </i>Todo Lists</a></li>
                            </ul>
                        </div>
                    </div> */}

                            <div className="list-group lg-alt mt-5">

                              {chatListData && chatListData.map((list)=>{
                                return  <ChatUserList list={list} userID={userData._id} key={list._id} chatID={chatID?chatID:chatData ?chatData._id:""} />
                              })}
                               



                            </div>


                        </div>

                        <div className="ms-body">
                            <div className="action-header clearfix">
                                <div className="visible-xs" id="ms-menu-trigger" style={{ zIndex: 10 }} onClick={() => setOpen(!open)}>
                                    <i className="fa fa-bars"></i>
                                </div>

                            {name &&   <div className="pull-left hidden-xs">
                                    {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar m-r-10" /> */}
                                    <div className="lv-avatar pull-left mt-5">
                                        
                                            <h5>Chat With <b>{name}</b></h5>
                                    </div>
                                </div>}
                          
                                <ul className="ah-actions actions">
                                    <li>
                                        <a href="">
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="">
                                            <i className="fa fa-check"></i>
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a href="">
                                            <i className="fa fa-clock-o"></i>
                                        </a>
                                    </li> */}
                                    {/* <li className="dropdown">
                                        <a href="" data-toggle="dropdown" aria-expanded="true">
                                            <i className="fa fa-sort"></i>
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="">Latest</a>
                                            </li>
                                            <li>
                                                <a href="">Oldest</a>
                                            </li>
                                        </ul>
                                    </li> */}
                                    {/* <li className="dropdown">
                                        <a href="" data-toggle="dropdown" aria-expanded="true">
                                            <i className="fa fa-bars"></i>
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="">Refresh</a>
                                            </li>
                                            <li>
                                                <a href="">Message Settings</a>
                                            </li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </div>

                                {messageData && messageData.map((msg) => {
                                    if (msg.sender._id === userData._id)
                                        return <UserMessgeBox msg={msg} key={msg._id} />
                                    else return <SenderMessageBox msg={msg} key={msg._id} />
                                })}
                            
                            
                                {userData && sellerID && userData._id === sellerID ? (<></>) :(
                            <div className="msb-reply">
                            <form onSubmit={handleSubmit} >
                                <textarea placeholder="Text Message..." onChange={(e)=>setSendMessage(e.target.value)} value={sendMessage}></textarea>
                                <button type="submit"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                                )}
                        
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )

}