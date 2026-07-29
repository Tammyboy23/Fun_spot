import { useState } from "react";
import { LuEye, LuEyeClosed, LuLock, LuMail, } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

function Login(){
    const [see, setsee] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [load, setload] = useState(false)
    const navigate = useNavigate()
    const login = () => {
        
        if(!email || !password)
            return toast.error("Input the fields");
        
        setload(true)
        fetch("https://fun-spot.onrender.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
        .then((data) => {
            if(data.error) return toast.error(data.error);
            if(!data.token) return toast.error("Invalid response from server");
            toast.success(data.message)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.users))
            navigate('/')
        })
        .catch((err) => {
            console.log(err)
            toast.error(err.message || "Login failed. Please try again.")
        })
        .finally(() => {
            setload(false)
        })
        
    }
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
                        <input type="email" placeholder="Example@gmail.com" value={email} onChange={(e) => setemail(e.target.value)}/>
                    </div>
                    <label>Pasword</label>
                    <div className="login-input">
                        <h3><LuLock /></h3>
                        <input type={see ? "text" : "password"}  placeholder="••••••••" value={password} onChange={(e) => setpassword(e.target.value)}/>
                        <h3 onClick={() => setsee(!see)}>{see ? (<LuEyeClosed />) : (<LuEye />)}</h3>
                    </div>
                    <button onClick={login} disabled={load}>{load ? (<>Loggin In <ScaleLoader color="white" width={4} height={16}/></>) : (<>Login</>)}</button>
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