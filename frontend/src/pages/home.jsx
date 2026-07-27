import { useState } from 'react'
import img1 from '../assets/caucasian-family-is-enjoying-summer-vacation.jpg'
import img2 from '../assets/happy-woman-playing-arcade-game.jpg'
import img3 from '../assets/imgi_146_family-beach-with-sunset-background_1072992-1546.png'
import { LuHandshake, LuLaugh, LuSend } from 'react-icons/lu'
import { DotLoader, RingLoader, ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify'
function Home(){
    const [email, setemail] = useState("")
    const [load, setload] = useState(false)
    const submit = () => {
        setload(true)
        fetch("https://fun-spot.onrender.com/list",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
        })
        .then(res => res.json())
        .then((data) => {
            toast.success(data.message);
            setload(false)
        })
        .catch((err) => {
            console.log(err)
            toast.error(err.message || err)
            setload(false)
        })
    }
    return(
        <>
        <div className="land">
            <nav>
                <h1>Fun <span>Spot <LuLaugh /></span></h1>
                <button>Join List</button>
            </nav>
            <div className="hero">
                <div className="hero-txt">
                    <h1>Discover Your Next <br /><span>Perfect Outing</span></h1>
                    <p>You can now Easily Find a place for your next date-night, family otuing, birthday outing, single date and many more by using ai to find one within your budget or desired location.</p>
                    <div className="hero-txt-btns">
                        <button>Join List</button>
                    </div>
                </div>
                <div className="hero-imgs">
                    <img src={img1} alt="" />
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                </div>
            </div>
            <div className="how">
                <h2>How It works ?</h2>
                <h5>Detailed Explanation on how fun spot can help you</h5>
                <div className="how-container">
                <div className="how-card">
                    <span>STEP 1</span>
                    <div className="card-detail">
                        <h3>Insert Information</h3>
                        <p>You have to input the location u want to have your outing the theme the number of people and budget aand let fun spot do the rest</p>
                    </div>
                </div>
                <div className="how-card">
                    <span>STEP 2</span>
                    <div className="card-detail">
                        <h3>Processing Request</h3>
                        <p>Behind the scenes Ai processes all the information you have given to it and now it searches of a place wihtin your desired location to have fun with your poeple all within ur said budget</p>
                    </div>
                </div>
                <div className="how-card">
                    <span>STEP 3</span>
                    <div className="card-detail">
                        <h3>Have Fun</h3>
                        <p>If it works the way it is supposed to u should have multiple locations that fit within ur description and a plan on  how to spend your budget there plus a google maps link to the location</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="join">
                <div className="join-card">
                    <h1>Join Now <LuHandshake /></h1>
                    <h3>Be Amongst the first to make use of this product when complete</h3>
                    <div className="join-form">
                        <input type="email" placeholder='example@gmail.com' value={email} onChange={(e) => setemail(e.target.value)}/>
                        <button onClick={submit} disabled={load}>
                            {load ? (
                                <><span>Joining</span><ScaleLoader height={16} width={4} color='white' /></>
                            ) : (
                                <><span>Join Waitlist</span><LuSend /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
           <div className="faq">
            <h1>Frequently Asked Questions</h1>
            <details>
                <summary>How doest it plan my outings?</summary>
                <p>It uses AI to get location within your budget and one that matches ur theme.</p>
            </details>
            <details>
                <summary>Do I have to pay for fun spot ?</summary>
                <p>No fun spot is completely free for now until premium features are added.</p>
            </details>
            <details>
                <summary>When is it going to be released ?</summary>
                <p>The time of release for fun spot is unknown but should be sometime this month.</p>
            </details>
            <details>
                <summary>Who created Fun Spot ?</summary>
                <p>Fun Spot was created by fagboyegun tamilore a software engineer </p>
            </details>
           </div>
            <footer>
                <p>Copyright &copy; {new Date().getFullYear()} built by Fagboyegun Oluwatamilore</p>
            </footer>
        </div>
        </>
    )
}
export default Home;