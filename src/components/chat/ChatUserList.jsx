/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ChatUserList({
  list,
  userID,
  chatID,
  setOpen,
  unreadMessages,
}) {
  const filteredParticipants = list.participants.filter(
    (participant) => participant._id !== userID
  );

  const active = chatID === list._id;

  const lastMsg =
    list?.lastMessage?.content.length > 20
      ? list?.lastMessage?.content.substring(0, 20) + "...."
      : list?.lastMessage?.content;

  const date = new Date(list?.lastMessage?.createdAt);
  const formattedDate = isNaN(date.getHours())
    ? ""
    : `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;

  const [unread, setUnread] = useState([]);

  useEffect(() => {
    const URM = unreadMessages?.filter((ele) => ele.chat === list._id);
    setUnread(URM);
  }, [unreadMessages, chatID, list._id]);

  return (
    <div
      className={active ? "list-menu active media" : "list-menu"}
      onClick={() => setOpen(false)}
    >
      <Link
        to={`/chatScreen/chatID/${list._id}`}
        className={
          active ? "list-group-item active media" : "list-group-item media"
        }
      >
        <div className="d-flex flex-row">
          <div className="pull-left">
            <img
              src={
                filteredParticipants[0]?.profile ||
                "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
              }
              style={{ borderRadius: "50%" }}
              alt=""
              className="img-avatar"
            />
          </div>
          <div className="media-body w-100 ms-2">
            <div className="list-group-item-heading">
              {filteredParticipants[0]?.username}
              <span className="badge text-danger" style={{ fontSize: "12px" }}>
                {unread.length > 0 && <span>{unread.length} unread</span>}
              </span>
            </div>
            <small className="list-group-item-text c-gray text">
              {lastMsg || (unread.length > 0 && unread[unread.length - 1])}
            </small>
            <div className="d-flex justify-content-end">{formattedDate}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
