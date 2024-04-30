import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delete_Chat } from "../../actions/chatActions";
import DeleteChat from "./DeleteChat";

export default function ChatUserList({ list, userID, chatID, token, setOpen, unreadMessages }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredParticipants = list.participants.filter(
    (participant) => participant._id !== userID
  );

  const active = chatID === list._id;
  
  const lastMsg =
    list?.lastMessage?.content.length > 20
      ? list?.lastMessage?.content.substring(0, 20) + "...."
      : list?.lastMessage?.content;
  const date = new Date(list?.lastMessage?.createdAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  var formattedDate = ` ${hours}:${minutes}`;
  if (isNaN(hours)) {
    formattedDate = "";
  }
  const [unread,setUnread]=useState([]);

  
  useEffect(()=>{
    const URM=unreadMessages?.filter((ele)=>ele.chat === list._id);
    setUnread(URM);


  },[unreadMessages,chatID])




  return (
    <div className={active ? "list-menu active  media" : "list-menu "} onClick={() => setOpen(false)}>
      <Link
        to={`/chatScreen/chatID/${list._id}`}
        className={
          active ? "list-group-item active  media" : "list-group-item  media "
        }
      >
        <div className="d-flex flex-row ">
          <div className="pull-left">
            <img src={filteredParticipants[0]?.profile ? filteredParticipants[0].profile : "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"} style={{ borderRadius: "50%" }} alt="" className="img-avatar" />
          </div>
          <div className="media-body w-100 ms-2">
            <div className="list-group-item-heading">
              {filteredParticipants[0]?.username}<span class="badge text-danger " style={{ fontSize: "12px" }}>
                {unread.length>0 && <span>{unread.length} unread</span>}
              </span>
            </div>
            <small className="list-group-item-text c-gray text-">{lastMsg}</small>
            <div className="d-flex justify-content-end">{formattedDate}</div>
          </div>

        </div>
      </Link>
      {/* {isHover && <button className='bg-dark d-flex align-items-center justify-content-center' onClick={handleDelete} style={{ width: "50px" }}>
                <i className="fa fa-trash text-danger fs-5"></i>
            </button>} */}
    </div>
  );
}