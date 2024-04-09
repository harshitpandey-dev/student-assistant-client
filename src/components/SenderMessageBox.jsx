import React from 'react'

export default function SenderMessageBox() {
  return (
      <div className="message-feed media">
          <div className="pull-left">
              {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar" /> */}
              <h5>Sender</h5>
          </div>
          <div className="media-body">
              <div className="mf-content">
                  Quisque consequat arcu eget odio cursus, ut tempor arcu vestibulum. Etiam ex arcu, porta a urna non, lacinia pellentesque orci. Proin semper sagittis erat, eget condimentum sapien viverra et. Mauris volutpat magna nibh, et condimentum est rutrum a. Nunc sed turpis mi. In eu massa a sem pulvinar lobortis.
              </div>
              <small className="mf-date"><i className="fa fa-clock-o"></i> 20/02/2015 at 09:00</small>
          </div>
      </div>
  )
}
