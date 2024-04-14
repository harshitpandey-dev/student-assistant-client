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
              {/* <img src={msg?.attachments[0]?.url}  alt="" className="img-avatar" /> */}
          
          </div>
         {msg?.attachments.length>0 && <div className='content-image mf-content send_img '>
              { msg.attachments.map((ele,ind)=>{
                return   <img src={ele.url} alt={ind} />
              })}
          </div>}
          <div className="media-body mt-1">
              <div className="mf-content msg_cotainer_send " style={{ fontFamily: "'Gluten', sans-serif" }}>
                  {msg?.content}
              <small className="mf-date msg_time_send "><i className="fa fa-clock-o"></i> {formattedDate}</small>
              </div>
    
          </div>
      </div>
  )
}
