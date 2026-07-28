import { useState } from "react";
import { LuEye, LuEyeClosed, LuLock, LuMail, LuUser } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";

function Signup(){
    const [see, setsee] = useState(false);
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [load, setload] = useState(false)
    const navigate = useNavigate()
    const signup = () => {
        if(!username || !email || !password)
            return toast.error("Fill in the inputs");
        setload(true)
        try{
        fetch("https://fun-spot.onrender.com/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            toast.success(data.message)
            navigate('/login')
        })
        }
        catch(err){
            console.error(err)
            toast.error(err)
        }
        setload(false)
        

    }
    return(
        <>
        <div className="signup">
            <div className="sign-box">
                <h1>Sign Up</h1>
                <p>Create an account now</p>
                <div className="sign-form">
                    <label>Username</label>
                    <div className="sign-input">
                        <h3><LuUser /></h3>
                        <input type="text" placeholder="Example" value={username} onChange={(e) => setusername(e.target.value)}/>
                    </div>
                    <label>Email</label>
                    <div className="sign-input">
                        <h3><LuMail /></h3>
                        <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <label >Password</label>
                    <div className="sign-input">
                        <h3><LuLock /></h3>
                        <input type={see ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setpassword(e.target.value)}/>
                        <h3 onClick={() => setsee(!see)}>{see ? (<LuEyeClosed />):(<LuEye />)}</h3>
                    </div>
                    <button onClick={signup} disabled={load}>{load ? 
                (<><span>Creating</span> <ScaleLoader color="#fff" height={16} width={4} /></>) :
                (<>Create Account</>)  
                }</button>
                </div>
                <div className="or">
                    <div className="sla"></div>
                    <p>OR</p>
                    <div className="sla"></div>
                </div>
                <Link to='/login'>Already Have an Account ?</Link>
            </div>
        </div>
        </>
    )
}
export default Signup;