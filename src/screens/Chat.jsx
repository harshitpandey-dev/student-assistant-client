import React from 'react'
import Header from '../components/Header'

export default function Chat() {
    return (
        <>
        <Header />
            <div class="container-fluid d-flex justify-content-center vw-100 vh-100">
            <div class="wrapper vw-100 vh-100">
                <div class="main">
                    <div class="px-2 scroll">
                        <div class="d-flex align-items-center">
                            <div class="text-left pr-1"><img src="https://img.icons8.com/color/40/000000/guest-female.png" width="30" class="img1" /></div>
                            <div class="pr-2 pl-1"> <span class="name">Sarah Anderson</span>
                                <p class="msg">Hi Dr. Hendrikson, I haven't been falling well for past few days.</p>
                                <span className='name'>11:00 | 1 April 2024</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center text-right justify-content-end ">
                            <div class="pr-2"> <span class="name">Dr. Hendrikson</span>
                                <p class="msg">Let's jump on a video call</p>
                                    <span className='name'>12:00 | 1 April 2024</span>
                            </div>
                            <div><img src="https://i.imgur.com/HpF4BFG.jpg" width="30" class="img1" /></div>
                        </div>

                        <div class="d-flex align-items-center">
                            <div class="text-left pr-1"><img src="https://img.icons8.com/color/40/000000/guest-female.png" width="30" class="img1" /></div>
                            <div class="pr-2 pl-1"> <span class="name">Sarah Anderson</span>
                                <p class="msg">How often should i take this?</p>
                                    <span className='name'>12:00 | 1 April 2024</span>
                            </div>
                        </div>
                        <div class="d-flex align-items-center text-right justify-content-end ">
                            <div class="pr-2"> <span class="name">Dr. Hendrikson</span>
                                <p class="msg">Twice a day, at breakfast and before bed</p>
                                    <span className='name'>14:00 | 1 April 2024</span>
                            </div>
                            <div><img src="https://i.imgur.com/HpF4BFG.jpg" width="30" class="img1" /></div>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="text-left pr-1"><img src="https://img.icons8.com/color/40/000000/guest-female.png" width="30" class="img1" /></div>
                            <div class="pr-2 pl-1"> <span class="name">Sarah Anderson</span>
                                <p class="msg">How often should i take this?</p>
                                    <span className='name'>15:00 | 1 April 2024</span>
                            </div>
                        </div>
                    </div>
                    <nav class="navbar bg-white navbar-expand-sm d-flex justify-content-center"> <input type="text number" name="text" class="form-control setWidth" placeholder="Type a message..." />
                        <div class="icondiv d-flex justify-content-end align-content-center text-center ml-2"> <button className='btn '><i class="fa fa-arrow-circle-right icon2"></i> </button></div>
                    </nav>
                </div>
            </div>
            </div>
        </>

            )
}
