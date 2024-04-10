import React from 'react'

export default function UserMessgeBox({msg}) {
    const date = new Date(msg.createdAt)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');


    const formattedDate = ` ${hours}:${minutes} | ${day}-${month}-${year}`;
  return (
      <div className="message-feed right">
          <div className="pull-right">
              {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar" /> */}
              {/* <span >{msg?.sender?.username}</span> */}
          </div>
          <div className="media-body">
              <div className="mf-content msg_cotainer_send">
                  {msg?.content}
              </div>
    
              <small className="mf-date msg_time_send "><i className="fa fa-clock-o"></i> {formattedDate}</small>
          </div>
      </div>
  )
}
