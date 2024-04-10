import React from 'react'

export default function UserMessgeBox({msg}) {
    const date = new Date(msg.createdAt)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');


    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return (
      <div className="message-feed right">
          <div className="pull-right">
              {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar" /> */}
              <h5>{msg?.sender?.username}</h5>
          </div>
          <div className="media-body">
              <div className="mf-content">
                  {msg?.content}
              </div>
              <small className="mf-date text-dark"><i className="fa fa-clock-o"></i> {formattedDate}</small>
          </div>
      </div>
  )
}
