import { useEffect, useRef, useState } from "react";
// import Header from "../../components/Header";
import SenderMessageBox from "../../components/SenderMessageBox";
import UserMessgeBox from "../../components/UserMessgeBox";
import ChatUserList from "../../components/ChatUserList";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { delete_Chat, get_All_Chat, get_Chat } from "../../actions/chatActions";
import { getMessage, postMessage } from "../../actions/messageAction";
import { CHAT_LIST_RESET, CHAT_RESET } from "../../types/chatConstants";
import { MESSAGE_RESET } from "../../types/messageConstants";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import Dropdown from 'react-bootstrap/Dropdown';

export default function ChatScreen() {
  const match = useParams();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const messagesEndRef = useRef(null);
  const [typeMessage, setTypeMessage] = useState(null);
  const sellerID = match.sellerID;
  const chatID = match.chatID;
  const [open, setOpen] = useState();
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  var { userData } = userLogin;
  const getCHAT = useSelector((state) => state.getChat);
  var { chatData, loading } = getCHAT;
  const Message = useSelector((state) => state.getMessage);
  var { messageData } = Message;
  const chatList = useSelector((state) => state.chatList);
  var { chatListData } = chatList;
  const [sendMessage, setSendMessage] = useState("");
  const deleteChat = useSelector((state) => state.deleteChat);
  var { success, error } = deleteChat;
  const [reload, setReload] = useState(false);

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  console.log(images);

  // useEffect(() => {

  //     socket.on("typing", () => setIsTyping(true));
  //     socket.on("stop typing", () => setIsTyping(false));

  // }, []);

  useEffect(() => {
    dispatch({ type: CHAT_RESET });
    dispatch({ type: MESSAGE_RESET });
    dispatch({ type: CHAT_LIST_RESET });
  }, [sellerID,chatID]);

  useEffect(() => {
    if (userData && sellerID && userData._id === sellerID) {
      return;
    }
    if (!chatID && userData && sellerID) {
      dispatch(get_Chat(sellerID, userData.token));
    }
  }, [sellerID, userData, chatID, reload]);

  useEffect(() => {
    if (userData && sellerID && userData._id === sellerID) {
      return;
    }
    if (userData && chatData && !chatID) {
      dispatch(getMessage(chatData._id, userData.token));
    }
    if (userData && chatID) {
      dispatch(getMessage(chatID, userData.token));
    }
    if (userData) {
      dispatch(get_All_Chat(userData._id, userData.token));
    }
  }, [chatData, chatID, userData, reload,sellerID]);

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      userData = JSON.parse(localStorage.getItem("userData"));
    } else {
      navigate("/");
      return;
    }
    dispatch(get_All_Chat(userData._id, userData.token));
    if (userData._id === sellerID) {
      return;
    }

    setSendMessage("");
  }, [dispatch, sellerID, userData, chatID,reload]);

  function handleSubmit(e) {
    e.preventDefault();
    if (sendMessage === "") {
      setTypeMessage("Type a message....");
      setTimeout(() => {
        setTypeMessage(null);
      }, 3000);
    }
    if (sendMessage !== "") {
      const formData = new FormData();
      formData.append("content", sendMessage);
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        formData.append("attachments", file);
      }
      if (chatID) {
        dispatch(postMessage(chatID, formData, userData.token));
      } else {
        dispatch(postMessage(chatData._id, formData, userData.token));
      }
      if (userData && chatData && !chatID) {
        dispatch(getMessage(chatData._id, userData.token));
      }
      if (userData && chatID) {
        dispatch(getMessage(chatID, userData.token));
      }
      setSendMessage("");
      setReload(!reload);
      setImages([]);
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageData]);

  function handleDelete() {
    if (window.confirm("Are you sure?")) {
      if (chatID) dispatch(delete_Chat(chatID, userData.token));
      else dispatch(delete_Chat(chatData._id, userData.token));
    }
    navigate("/");
  }
  const uploadFileHandler = async (e) => {
    const data = e.target.files[0];
    if (!data) return;
    const imagesData = [...images];
    imagesData.push(data);

    setImages(imagesData);
    setUploading(false);
  };

  const removeImg = (fileToRemove) => {
    const updatedImages = images.filter((file) => file !== fileToRemove);
    setImages(updatedImages);
  };

  function typingHandler(e) {
    setSendMessage(e.target.value);
    if (!typing) {
      setTyping(true);

      // socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        // socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  }

  return (
    <>
      {/* <Header /> */}
      {loading ? (
        <Loader />
      ) : (
        <div className="chatScreen">
          <div className=" bootstrap snippets bootdey p-2">
            <div className="tile tile-alt" id="messages-main">
              <div className={open ? "ms-menu toggled" : "ms-menu"}>
                <div className="ms-user clearfix text-white fs-2">
                        {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar pull-left" /> */}
                       
                    {/* <span
                      className="text-center fs-5 text-light mb-2"
                      style={{ fontFamily: "'Gluten', sans-serif", textDecoration: "underline" }}
                    >
                      <Link to="/">Student Assistant</Link>
                    </span> */}
                    </div>

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
                  {/* <span
                    className="text-center fs-1 text-light mb-2"
                    style={{ fontFamily: "'Gluten', sans-serif" ,textDecoration:"underline"}}
                  >
                   <Link to="/ChatScreen">CHAT</Link> 
                  </span> */}
                  {chatListData &&
                    chatListData.map((list) => {
                      return (
                        <ChatUserList
                          list={list}
                          userID={userData._id}
                          key={list._id}
                          chatID={
                            chatID ? chatID : chatData ? chatData._id : ""
                          }
                        />
                      );
                    })}
                </div>
              </div>

              <div className="ms-body">
                <div className="action-header clearfix">
                  <div
                    className="visible-xs"
                    id="ms-menu-trigger"
                    style={{ zIndex: 10 }}
                    onClick={() => setOpen(!open)}
                  >
                    <i className="fa fa-bars text-dark"></i>
                  </div>
                    <span
                      className="text-center fs-2 text-light mb-2 d-flex flex-column"
                      style={{ fontFamily: "'Gluten', sans-serif" ,marginLeft:"20px"}}
                    >
                      {/* <Link to="/"></Link> */}
                      {/* <div className="fs-5 text-dark">{userData?.username}</div> */}
                      {/* <div className="fs-5 text-dark">{userData?.email}</div> */}
                      <div className="fs-3 text-light">CHAT ARENA</div>
                      
                    </span>
                  <ul className="ah-actions actions">
                    {/* <li>
                      <button onClick={handleDelete} style={{ width: "50px" }}>
                        <i className="fa fa-trash text-danger fs-5"></i>
                      </button>
                    </li> */}
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
                    <li> <Dropdown style={{width:"20px",height:"20px"}}>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ width: "30px",height:"30px" }} >
                          
                        </Dropdown.Toggle>

                       
                      {messageData && <Dropdown.Menu>
                          <Dropdown.Item onClick={handleDelete} className="text-danger">Delete Chat</Dropdown.Item>
                        </Dropdown.Menu>}
                      </Dropdown>
                      </li>
                  </ul>
                </div>
                <div className="show-msg">
                  {messageData &&
                    messageData.map((msg) => {
                      if (msg.sender._id === userData._id)
                        return <UserMessgeBox msg={msg} key={msg._id} />;
                      else return <SenderMessageBox msg={msg} key={msg._id} />;
                    })}
                  <div ref={messagesEndRef} />
                </div>

                {images && (
                  <div className="position-relative mt-5">
                    {images.map((file, index) => (
                      <div
                        key={index}
                        className="d-inline-block position-relative input-img"
                      >
                        <img
                          className="mt-2 "
                          src={URL.createObjectURL(file)}
                          style={{ height: "100px" }}
                          alt={`image${index + 1}`}
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0 img-rem"
                          style={{ width: "30px", height: "40px" ,display:"none"}}
                          onClick={() => removeImg(file)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {typeMessage && (
                  <span className="text-white ms-4">Type a Message.....</span>
                )}
                {istyping ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      // height={50}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {((userData && sellerID && userData._id === sellerID)||(!sellerID && !chatID)) ? (
                  <></>
                ) : (
                  <div className="card-footer">
                    <div className="input-group">
                      <div className="input-group-append">
                        {/* <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span> */}
                        {images.length < 4 && (
                          <>
                            <label
                              for="fileInput"
                              className="input-group-text attach_btn"
                            >
                              <i className="fas fa-paperclip"></i>
                            </label>
                            <input
                              type="file"
                              id="fileInput"
                              style={{ display: "none" }}
                              multiple
                              custom
                              onChange={uploadFileHandler}
                            />
                          </>
                        )}
                      </div>
                      <textarea
                        name=""
                        className="form-control type_msg text-light chatInput"
                        placeholder="Type your message..."
                            style={{ fontFamily: "'Gluten', sans-serif" }}
                        onChange={(e) => typingHandler(e)}
                        value={sendMessage}
                      ></textarea>
                      <div className="input-group-append">
                        <span
                          className="input-group-text send_btn"
                          onClick={handleSubmit}
                        >
                          <i className="fas fa-location-arrow"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* <form onSubmit={handleSubmit} >
                                            <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                <textarea placeholder="Text Message..." onChange={(e)=>setSendMessage(e.target.value)} value={sendMessage}></textarea>
                                <button type="submit"><i className="fa fa-paper-plane"></i></button>
                                </form> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
