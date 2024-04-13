import React from 'react'
import { Link } from 'react-router-dom';

export default function ChatUserList({list,userID,chatID}) {

    const filteredParticipants = list.participants.filter(participant => participant._id !== userID);

    const active=(chatID===list._id);

    const lastMsg = list?.lastMessage?.content.length > 20 ? list?.lastMessage?.content.substring(0, 20)+"...." : list?.lastMessage?.content;
    
   
    return (

        <Link to={`/chatScreen/chatID/${list._id}`} className={active ?"list-group-item active  media mb-2":"list-group-item  media mb-2"}>
            <div className="pull-left">
                {/* <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt="" className="img-avatar" /> */}
            </div>
            <div className="media-body">
                <div className="list-group-item-heading">
                    {filteredParticipants[0].username}
                </div>
                <small className="list-group-item-text c-gray">{lastMsg}</small>
            </div>
        </Link>

    )
}
