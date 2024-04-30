import { useEffect, useRef, useState } from "react";
// import Header from "../../components/Header";
import SenderMessageBox from "../../components/chat/SenderMessageBox";
import UserMessgeBox from "../../components/chat/UserMessgeBox";
import ChatUserList from "../../components/chat/ChatUserList";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_Chat,
  get_All_Chat,
  getOrCreate_Chat,
} from "../../actions/chatActions";
import { getMessage, postMessage } from "../../actions/messageAction";
import { CHAT_LIST_RESET, CHAT_RESET } from "../../types/chatConstants";
import { MESSAGE_RESET } from "../../types/messageConstants";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDots } from "react-icons/bs";
import DeleteChat from "../../components/chat/DeleteChat";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "../../contexts/SocketContext";
import { Button, Form } from "react-bootstrap";
import { FaBell, FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import AddEditProfilePic from "../../components/user/AddEditProfilePic";

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";

export default function ChatScreen() {
  const { socket } = useSocket();
  const match = useParams();
  const sellerID = match.sellerID;
  let chatID = match.chatID;
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
  const deleteChat = useSelector((state) => state.deleteChat);
  var { success, error } = deleteChat;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // console.log();

  const messagesEndRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [typing, setTyping] = useState(false); //selftyping
  const [istyping, setIsTyping] = useState(false); //chattyping

  const [chats, setChats] = useState([]); // To store user's chats

  const [typeMessage, setTypeMessage] = useState(null);
  const [sendMessage, setSendMessage] = useState("");
  const [messages, setMessages] = useState([]); //to store user's messages
  const [unreadMessages, setUnreadMessages] = useState([]); // To track unread messages

  const [isConnected, setIsConnected] = useState(false);

  const [reload, setReload] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [chatWith, setChatWith] = useState([]);

  useEffect(() => {
    if (userData && chatListData && chatID) {
      const activeChat = chatListData?.filter((item) => item._id === chatID);
      const filteredParticipants = activeChat[0]?.participants?.filter(
        (participant) => participant?._id !== userData?._id
      );
      setChatWith(filteredParticipants[0]);
    }
  }, [chatID, userData, chatListData]);

  useEffect(() => {
    if (userData && chatData && sellerID) {
      // const activeChat =  chatData?.filter((item) => item._id === sellerID);
      const filteredParticipants = chatData?.participants?.filter(
        (participant) => participant?._id !== userData?._id
      );
      setChatWith(filteredParticipants[0]);
    }
  }, [sellerID, userData, chatData]);

  useEffect(() => {
    setChats(chatListData);
  }, [chatListData]);
  useEffect(() => {
    setMessages(messageData);
  }, [messageData]);
  // >>>>>>> origin/main

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const handleOnSocketTyping = (chatId) => {
    if (chatId !== chatID) return;
    setIsTyping(true);
  };

  const handleOnSocketStopTyping = (chatId) => {
    if (chatId !== chatID) return;

    setIsTyping(false);
  };

  const onMessageReceived = (message) => {
    if (message?.chat !== chatID) {
      setUnreadMessages((prev) => [...prev, message]);
    } else {
      setMessages((prev) => [...prev, message]);
    }
  };

  const onNewChat = (chat) => {
    setChats((prev) => [chat, ...prev]);
  };

  const onChatLeave = (chat) => {
    if (chat._id === chatID) {
      chatID = null;
    }
    setChats((prev) => prev.filter((c) => c._id !== chat._id));
  };

  useEffect(() => {
    if (!socket) return;
    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(TYPING_EVENT, handleOnSocketTyping);
    socket.on(STOP_TYPING_EVENT, handleOnSocketStopTyping);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    socket.on(NEW_CHAT_EVENT, onNewChat);
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);

    return () => {
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, handleOnSocketTyping);
      socket.off(STOP_TYPING_EVENT, handleOnSocketStopTyping);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
    };
  }, [socket, chats]);

  useEffect(() => {
    dispatch({ type: CHAT_RESET });
    dispatch({ type: MESSAGE_RESET });
    dispatch({ type: CHAT_LIST_RESET });
  }, []);

  useEffect(() => {
    if (userData && sellerID && userData?._id === sellerID) {
      return;
    }
    if (!chatID && userData && sellerID) {
      dispatch(getOrCreate_Chat(sellerID, userData.token));
    }
  }, [sellerID, userData, chatID, reload]);

  useEffect(() => {
    if (userData && sellerID && userData?._id === sellerID) {
      return;
    }
    if (userData && chatData && !chatID) {
      dispatch(getMessage(chatData._id, userData.token));
      if (socket) socket.emit(JOIN_CHAT_EVENT, chatData._id);
    }
    if (userData && chatID) {
      dispatch(getMessage(chatID, userData.token));
      if (socket) socket.emit(JOIN_CHAT_EVENT, chatID);
    }
    if (userData) {
      dispatch(get_All_Chat(userData._id, userData.token));
    }
  }, [chatData, chatID, userData, reload, sellerID]);

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
  }, [dispatch, sellerID, userData, chatID, reload]);

  function handleSubmit(e) {
    e.preventDefault();
    if (sendMessage === "" && images.length === 0) {
      setTypeMessage("Type a message....");
      setTimeout(() => {
        setTypeMessage(null);
      }, 3000);
    }
    if (sendMessage !== "" || images.length !== 0) {
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
  }, [messageData, messages]);

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
    if (!socket || !isConnected) return;
    if (!typing) {
      setTyping(true);

      socket.emit(TYPING_EVENT, chatID);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit(STOP_TYPING_EVENT, chatID);
        setTyping(false);
      }
    }, timerLength);
  }

  const handleEmojiClick = (emoji) => {
    const emojiChar = emoji.emoji;
    setSendMessage((prevMessage) => prevMessage + emojiChar);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="chatScreen d-flex ">
          <div className="" style={{ width: "50px", height: "100px" }}>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 mt-5">
              <div>
                {/* <label
                  for="fileInput"
                  style={{ cursor: "pointer" }}
                >
                  <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" className="img-avatar box-img" />
                  
                </label> */}
                <AddEditProfilePic user={userData} />
              </div>
              <div>
                <Link to="/" className="fs-4 text-light">
                  <FaHome />
                </Link>
              </div>
            </div>
          </div>
          <div className=" bootstrap snippets bootdey p-2 w-100">
            <div className="tile tile-alt" id="messages-main">
              <div className={open ? "ms-menu toggled" : "ms-menu"}>
                <div className="ms-user clearfix text-white fs-2 d-flex justify-content- ">
                  {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar pull-left" /> */}

                  <div
                    className="fs-3 text-light mb-2"
                    style={{ fontFamily: "'Gluten', sans-serif" }}
                  >
                    Student Assistant
                  </div>
                  <div className="d-flex">
                    <span className="badge fs-5 text-danger">
                      <FaBell className="text-light fs-3" />
                      {/* enter value */}
                    </span>
                  </div>
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

                <div className="list-group lg-alt mt-1">
                  <div className="d-flex flex-row justify-content-center w-100 mb-4 ">
                    <div
                      className="bg-light d-flex justify-content-center align-items-center"
                      style={{ width: "40px", borderRadius: "10px 0 0 10px" }}
                    >
                      <FaSearch />
                    </div>
                    <Form style={{ display: "flex" }}>
                      <Form.Control
                        type="text"
                        name="q"
                        onChange={(e) => setSearchUser(e.target.value)}
                        placeholder="Search Users..."
                        className="mr-sm-2 ml-sm-5 serach-user"
                        style={{
                          height: "50px",
                          width: "300px",
                          borderRadius: "0 10px 10px 0",
                        }}
                      ></Form.Control>
                    </Form>
                  </div>
                  <span
                    className="text-light fs-5 mb-2"
                  // style={{ fontFamily: "'Gluten', sans-serif" ,textDecoration:"underline"}}
                  >
                    <span>Recent Chats</span>
                  </span>
                  {searchUser === "" &&
                    chats &&
                    chats.map((list) => {
                      return (
                        <ChatUserList
                          list={list}
                          userID={userData._id}
                          key={list._id}
                          chatID={
                            chatID ? chatID : chatData ? chatData._id : ""
                          }
                          token={userData?.token}
                          setOpen={setOpen}
                        />
                      );
                    })}
                  {searchUser !== "" &&
                    chats &&
                    chats
                      .filter((list) =>
                        list.participants.some(
                          (participant) =>
                            participant.username &&
                            participant.username != userData.username &&
                            participant.username.includes(searchUser)
                        )
                      )
                      .map((list) => (
                        <ChatUserList
                          list={list}
                          userID={userData._id}
                          key={list._id}
                          chatID={
                            chatID ? chatID : chatData ? chatData._id : ""
                          }
                          token={userData?.token}
                        />
                      ))}
                  {!chats && (
                    <span className="text-center fs-5 text-danger mb-2">
                      No Chat !!
                    </span>
                  )}
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
                    <i className="fa fa-bars text-light"></i>
                  </div>
                  <span
                    className=" fs-2 text-light  d-flex flex-row justify-content-between align-items-center humgerber"
                    style={{
                      fontFamily: "'Gluten', sans-serif",
                      marginLeft: "-21px",
                    }}
                  >
                    {/* <Link to="/"></Link> */}
                    <div className="d-flex ">
                      {chatWith.length !== 0 && (
                        <>
                          <img
                            src={
                              chatWith?.profile
                                ? chatWith.profile
                                : "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
                            }
                            alt=""
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                            }}
                            className="img-avatar pull-left ms-4"
                          />
                          <div
                            className="d-flex flex-column ms-4 pt-1 align-items-center justify-content-center"
                            style={{ lineHeight: "26px" }}
                          >
                            <div className="fs-2  text-light mt-2">
                              {chatWith?.fullname}
                            </div>
                            <div
                              className="ms-4 text-dark"
                              style={{ fontSize: "16px" }}
                            >
                              {chatWith?.username}
                            </div>
                          </div>{" "}
                        </>
                      )}
                    </div>

                    {messageData && (
                      <div>
                        {" "}
                        <Dropdown style={{ width: "42px", height: "48px" }}>
                          <style>{`
      .dropdown-toggle::after {
        display: none;
      }
    `}</style>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            style={{
                              width: "50px",
                              height: "35px",
                              marginRight: "22px",
                            }}
                          >
                            <BsThreeDots className="text-dark fs-2 " />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="bg-light">
                            <DeleteChat
                              chatid={messageData[0]?.chat}
                              token={userData?.token}
                            />
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    )}
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
                    {/* { messageData && <li> <Dropdown style={{width:"42px",height:"30px"}} >
                        <style>{`
      .dropdown-toggle::after {
        display: none;
      }
    `}</style>
                          <Dropdown.Toggle
                            variant="dark"
                            id="dropdown-basic"
                            style={{ width: "50px", height: "35px" }}
                          >
                            <BsThreeDots className="text-light" />
                          </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-danger">
                  <DeleteChat />

                        </Dropdown.Menu>
                      
                      </Dropdown>
                      </li>} */}
                  </ul>
                </div>
                <div className="show-msg pt-3">
                  {messages ? (
                    messages.map((msg) => {
                      if (msg.sender._id === userData._id)
                        return <UserMessgeBox msg={msg} key={msg._id} />;
                      else return <SenderMessageBox msg={msg} key={msg._id} />;
                    })
                  ) : (
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                      Select a chat to talk !!
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {images && (
                  <div className=" input-above">
                    {images.map((file, index) => (
                      <div
                        key={index}
                        className="d-inline-block  input-img"
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
                          style={{
                            width: "30px",
                            height: "40px",
                            display: "none",
                          }}
                          onClick={() => removeImg(file)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="input-above">
                  {typeMessage && (
                    <span className="text-white ms-4">Type a Message.....</span>
                  )}
                  {showEmojiPicker && (
                    <EmojiPicker
                      onEmojiClick={(e) => handleEmojiClick(e)}
                      width={"100%"}
                    />
                  )}
                  {istyping ? (
                    <div>
                      <Lottie 
                        options={defaultOptions}
                        height={20}
                        width={70}
                        style={{ marginBottom: 1, marginLeft: 10 }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                {(userData && sellerID && userData._id === sellerID) ||
                  (!sellerID && !chatID) ? (
                  <></>
                ) : (
                  <div className="card-footer">
                    <div className="input-group ">
                      <textarea
                        name=""
                        className="form-control type_msg text-dark chatInput"
                        placeholder="Type A Message..."
                        style={{ fontFamily: "'Gluten', sans-serif" }}
                        onChange={(e) => typingHandler(e)}
                        value={sendMessage}
                      ></textarea>

                      <div className="input-group-append">
                        {/* <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span> */}
                        {images.length < 4 && (
                          <>
                            <label
                              htmlFor="fileInput"
                              className="input-group-text attach_btn"
                            >
                              <i className="fas fa-paperclip"></i>
                            </label>
                            <input
                              type="file"
                              id="fileInput"
                              style={{ display: "none" }}
                              multiple
                              onChange={uploadFileHandler}
                            />
                          </>
                        )}
                      </div>
                      <div className="input-group-append d-flex">
                        <span>
                          {/* Emoji button */}
                          <button
                            style={{ width: "50px", zIndex: "0" }}
                            className="btn emoji"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          >
                            😀
                          </button>
                        </span>
                        <span
                          className="input-group-text send_btn"
                          onClick={handleSubmit}
                        >
                          <IoSend className="fs-4" />
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