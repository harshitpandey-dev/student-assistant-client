import { useState } from "react";
import Header from "../components/Header";
import SenderMessageBox from "../components/SenderMessageBox";
import UserMessgeBox from "../components/UserMessgeBox";
import ChatUserList from "../components/ChatUserList";



export default function ChatScreen() {
    const [open, setOpen] = useState();
    return (
        <>
            <Header />
            <div classNameName="chatScreen mt-5">
                <div className="container bootstrap snippets bootdey mt-5">
                    <div className="tile tile-alt" id="messages-main">
                        <div className={open ? "ms-menu toggled" : "ms-menu"}>
                            {/* <div className="ms-user clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="img-avatar pull-left" />
                            <div>Signed in as <br/> m-hollaway@gmail.com</div>
                    </div> */}

                            {/* <div className="p-15">
                        <div className="dropdown">
                            <a className="btn btn-primary btn-block" href="" data-toggle="dropdown">Messages <i className="caret m-l-5"></i></a>

                            <ul className="dropdown-menu dm-icon w-100">
                                <li><a href=""><i className="fa fa-envelope"></i> Messages</a></li>
                                <li><a href=""><i className="fa fa-users"></i> Contacts</a></li>
                                <li><a href=""><i className="fa fa-format-list-bulleted"> </i>Todo Lists</a></li>
                            </ul>
                        </div>
                    </div> */}

                            <div className="list-group lg-alt mt-5">


                                <ChatUserList />



                            </div>


                        </div>

                        <div className="ms-body">
                            <div className="action-header clearfix">
                                <div className="visible-xs" id="ms-menu-trigger" style={{ zIndex: 10 }} onClick={() => setOpen(!open)}>
                                    <i className="fa fa-bars"></i>
                                </div>

                                {/* <div className="pull-left hidden-xs">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" className="img-avatar m-r-10" />
                                    <div className="lv-avatar pull-left">

                                    </div>
                                    <span>David Parbell</span>
                                </div> */}

                                <ul className="ah-actions actions">
                                    <li>
                                        <a href="">
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a href="">
                                            <i className="fa fa-check"></i>
                                        </a>
                                    </li> */}
                                    {/* <li>
                                        <a href="">
                                            <i className="fa fa-clock-o"></i>
                                        </a>
                                    </li> */}
                                    {/* <li className="dropdown">
                                        <a href="" data-toggle="dropdown" aria-expanded="true">
                                            <i className="fa fa-sort"></i>
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="">Latest</a>
                                            </li>
                                            <li>
                                                <a href="">Oldest</a>
                                            </li>
                                        </ul>
                                    </li> */}
                                    {/* <li className="dropdown">
                                        <a href="" data-toggle="dropdown" aria-expanded="true">
                                            <i className="fa fa-bars"></i>
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="">Refresh</a>
                                            </li>
                                            <li>
                                                <a href="">Message Settings</a>
                                            </li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </div>

                           
                                <SenderMessageBox />
                                <UserMessgeBox />
                            

                            <div className="msb-reply">
                                <textarea placeholder="What's on your mind..."></textarea>
                                <button><i className="fa fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}