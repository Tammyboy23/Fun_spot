import { useState } from "react";
import { LuEye, LuEyeClosed, LuLock, LuMail, LuUser } from "react-icons/lu";
import { Link } from "react-router-dom";

function Login(){
    const [see, setsee] = useState(false)
    return(
        <>
        <div className="login">
            <div className="login-box">
                <h1>Login</h1>
                <p>Enter account details</p>
                <div className="login-form">
                    <label>Email</label>
                    <div className="login-input">
                        <h3><LuMail /></h3>
                        <input type="email" placeholder="Example@gmail.com" />
                    </div>
                    <label>Pasword</label>
                    <div className="login-input">
                        <h3><LuLock /></h3>
                        <input type={see ? "text" : "password"}  placeholder="••••••••"/>
                        <h3 onClick={() => setsee(!see)}>{see ? (<LuEyeClosed />) : (<LuEye />)}</h3>
                    </div>
                    <button>Login</button>
                </div>
                <div className="or">
                    <div className="sla"></div>
                    <p>OR</p>
                    <div className="sla"></div>
                </div>
                <Link to='/signup'>Don't Have an Account</Link>
            </div>
        </div>
        </>
    )
}
export default Login;