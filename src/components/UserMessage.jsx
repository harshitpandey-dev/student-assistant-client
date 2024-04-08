import React from 'react'

export default function UserMessage() {
  return (
      <div className="d-flex align-items-center text-right justify-content-end ">
          <div className="pr-2"> <span className="name">Dr. Hendrikson</span>
              <p className="msg">Let's jump on a video call</p>
              <span className='name'>12:00 | 1 April 2024</span>
          </div>
          <div><img src="https://i.imgur.com/HpF4BFG.jpg" width="30" className="img1" /></div>
      </div>
  )
}
