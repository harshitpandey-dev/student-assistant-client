import React from 'react'

export default function UserMessgeBox() {
  return (
      <div className="message-feed right">
          <div className="pull-right">
              {/* <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar" /> */}
              <h5>User</h5>
          </div>
          <div className="media-body">
              <div className="mf-content">
                  Mauris volutpat magna nibh, et condimentum est rutrum a. Nunc sed turpis mi. In eu massa a sem pulvinar lobortis.
              </div>
              <small className="mf-date"><i className="fa fa-clock-o"></i> 20/02/2015 at 09:30</small>
          </div>
      </div>
  )
}
