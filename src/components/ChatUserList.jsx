import React from 'react'
import { Link } from 'react-router-dom';

export default function ChatUserList({list,userID,chatID}) {

    const filteredParticipants = list.participants.filter(participant => participant._id !== userID);
    // console.log(list);
    const active=(chatID===list._id);
    // setName("")
    // localStorage.setItem("ChatWith",filteredParticipants[0].username)
    // console.log(filteredParticipants);
    return (

        <Link to={`/chatScreen/chatID/${list._id}`} className={active ?"list-group-item active  media mb-2":"list-group-item  media mb-2"}>
            <div className="pull-left">
                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" className="img-avatar" />
            </div>
            <div className="media-body">
                <div className="list-group-item-heading">
                    {filteredParticipants[0].username}
                </div>
                <small className="list-group-item-text c-gray">{list?.lastMessage?.content}</small>
            </div>
        </Link>

    )
}
