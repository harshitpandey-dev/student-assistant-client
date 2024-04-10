import React from 'react'

export default function ChatUserList({list,userID}) {

    const filteredParticipants = list.participants.filter(participant => participant._id !== userID);
  
    return (

        <a className="list-group-item media mb-2" href="">
            <div className="pull-left">
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" className="img-avatar" />
            </div>
            <div className="media-body">
                <div className="list-group-item-heading">
                    {filteredParticipants[0].username}
                </div>
                <small className="list-group-item-text c-gray">{list?.lastMessage?.content}</small>
            </div>
        </a>

    )
}
