import { useState } from "react";
import "./Authstyle.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Message from "../../components/Message";
import { useLocation } from "react-router-dom";

function Resetpassword() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async () => {
        if(password!==setConPassword){
            setMessage("Passwords do not match");
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    return (
        <div className="w-100 d-flex flex-column align-items-center forgotpsswrd fs-1">
            <p className="forgottext">Reset Password</p>
            {message && <Message variant="danger">{message}</Message>}
            <p className="forgottext text-success">Email: {email}</p>
            <input
                type="text"
                placeholder="Enter New Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <input
                type="text"
                placeholder="Confirm Password"
                value={conPassword}
                onChange={(event) => setConPassword(event.target.value)}
            />
            <button className="resetbtn" onClick={handleResetPassword}>
                Update Password
            </button>
            <button className="B2loginbtn" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
}

export default Resetpassword;
