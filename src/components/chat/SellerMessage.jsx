import React from 'react'

export default function SellerMessage({msg}) {
    const date = new Date(msg.createdAt)

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');


    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

   
    return (
        <div className="d-flex align-items-center" >
            <div className="text-left pr-1"><img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" width="30" className="img1" /></div>
            <div className="pr-2 pl-1"> <span className="name">{msg?.sender?.username}</span>
                <p className="msg">{formattedDate}</p>
                <span className='name'>{msg.createdAt}</span>
            </div>
        </div>

    )
}
