import { useState, useEffect, useRef } from 'react'
import img1 from '../assets/caucasian-family-is-enjoying-summer-vacation.jpg'
import img2 from '../assets/happy-woman-playing-arcade-game.jpg'
import img3 from '../assets/imgi_146_family-beach-with-sunset-background_1072992-1546.png'
import {  LuHandshake, LuLaugh, LuLocate, LuLogOut, LuMapPin, LuPlus, LuMinus, LuRollerCoaster, LuSend, LuStar, LuStarHalf, LuUsers } from 'react-icons/lu'
import {  ScaleLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Home(){
    const [email, setemail] = useState("")
    const [load, setload] = useState(false)
    const [theme, settheme] = useState("")
    const [location, setlocation] = useState("")
    const [budget, setbudget] = useState("")
    const [budgetRaw, setbudgetRaw] = useState("")
    const [people, setpeople] = useState("")
    const [budget_type, setbudget_type] = useState("")
    const [places, setplaces] = useState(() => {
    const stored = localStorage.getItem('places')
    return stored ? JSON.parse(stored) : []
  })
    const [getload, setgetload] = useState(false)
    const [openFaq, setopenFaq] = useState(null)
    const [dropdownOpen, setdropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const [user] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
    const submit = () => {
        if(!email)
            return toast.error("Enter your email address");
        
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
            if(data.error) return toast.error(data.error);
            toast.success(data.message);
        })
        .catch((err) => {
            console.log(err)
            toast.error(err.message || "Something went wrong. Please try again.")
        })
        .finally(() => setload(false))
    }
    const start = () => {
        navigate('/signup')
    }
    const gotologin = () => {
        navigate('/login')
    }
    const get = (e) => {
        e.preventDefault()
        if(!theme || !people || !budget || !budget_type || !location)
            return toast.error("Fill in the details");
        setgetload(true)
        
        fetch("https://fun-spot.onrender.com/get", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({location, budget: budgetRaw || budget.replace(/,/g, ''), people, theme, budget_type})
        })
        .then(res => res.json())
        .then((data) => {
            if(data.error) return toast.error(data.error);
            if(!data.answer?.option) return toast.error("No results found. Try different details.");
            toast.success(data.message)
            console.log(data.answer.option)
            setplaces(data.answer.option)
            localStorage.setItem('places', JSON.stringify(data.answer.option))
        })
        .catch((err) => {
            toast.error(err.message || "Failed to find places. Check your connection.")
            console.log(err)
        })
        .finally(() => setgetload(false))
    }
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('places')
        navigate('/login')
    }
    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setdropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])
    return(
        <>
        { token ? (
            <div className="home">
                <nav><h1>Fun <span>Spot <LuLaugh /></span></h1>
                <div className="pfp-wrap" ref={dropdownRef}>
                <div className="pfp" onClick={() => setdropdownOpen(!dropdownOpen)}>{user?.username?.[0]?.toUpperCase() || "?"}</div>
                {dropdownOpen && (
                    <div className="pfp-dropdown">
                        <div className="pfp-dropdown-user">
                            <span className="pfp-dropdown-name">{user?.username || 'User'}</span>
                            <span className="pfp-dropdown-email">{user?.email || ''}</span>
                        </div>
                        <div className="pfp-dropdown-divider" />
                        <button className="pfp-dropdown-item" onClick={logout}>
                            <LuLogOut /> Logout
                        </button>
                    </div>
                )}
                </div>
                </nav>
                <div className="home-container">
                <div className="home-box">
                    <h1>Find Your Spot</h1>
                    <p className="home-sub">Fill in the details and let AI find the perfect place</p>
                    <div className="home-form">
                        <div className="home-row">
                            <div className="home-field">
                                <label><LuRollerCoaster /> Theme</label>
                                <div className="home-input">
                                    <input type="text" placeholder='e.g Date-night, Family-outing' value={theme} onChange={(e) => settheme(e.target.value)} />
                                </div>
                            </div>
                            <div className="home-field">
                                <label><LuLocate /> Location</label>
                                <div className="home-input">
                                    <input type="text" placeholder='e.g Country, City, State' value={location} onChange={(e) => setlocation(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="home-row">
                            <div className="home-field">
                                <label><LuUsers /> People</label>
                                <div className="home-input">
                                    <input type="tel"  placeholder='Number of People' value={people} onChange={(e) => setpeople(e.target.value)}/>
                                </div>
                            </div>
                            <div className="home-field">
                                <label>₦ Budget</label>
                                <div className="home-input">
                                <input type="text" placeholder='How much being spent' value={budget} onChange={(e) => {
                                    const raw = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
                                    setbudgetRaw(raw)
                                    setbudget(raw ? Number(raw).toLocaleString() : '')
                                }}/>
                                </div>
                            </div>
                        </div>
                        <div className="home-field">
                            <label>Budget Type</label>
                            <div className="home-input">
                                <select value={budget_type} onChange={(e) => setbudget_type(e.target.value)}>
                                    <option value="">Select budget type</option>
                                    <option value="for everyone" >For Everyone</option>
                                    <option value="per person" >Per Person</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="home-btns">
                        <button className="btn-primary" onClick={get}>
                            {getload ? <ScaleLoader height={16} width={4} color='white' /> : 'Find a Place'}
                        </button>
                        {places.length > 0 && (
                            <button className="btn-clear" onClick={() => {
                                setplaces([])
                                localStorage.removeItem('places')
                            }}>Clear</button>
                        )}
                    </div>
                </div>
                {places.length > 0 && (
                <div className="results-header">
                    <h2>Results <span>({places.length} {places.length === 1 ? 'place' : 'places'} found)</span></h2>
                </div>
                )}
                </div>
                {getload && (
                    <div className="places-loading">
                        <ScaleLoader height={20} width={5} color='var(--accent)' />
                        <p>Searching for the best spots...</p>
                    </div>
                )}
                {places.length > 0 && (
                <div className="places-container">
                    {places.map((place, index) => (
                        <div className="place" key={index} onClick={() => navigate('/details', { state: { place } })}>
                            <div className="places-img">
                                <img src={place.images?.[0]} alt={place.location_name} />
                            </div>
                            <div className="place-details">
                                <div className="place-header">
                                    <h2>{place.location_name}</h2>
                                    <span className="place-rating"><LuStar /> {place.rating}</span>
                                </div>
                                <p className="place-address"><LuMapPin /> {place.address || 'Address not available'}</p>
                                <span className="place-theme-tag">{place.theme}</span>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        ) :(
        <div className="land">
            <nav>
                <h1>Fun <span>Spot <LuLaugh /></span></h1>
                <div className="nav-btns">
                    <button className="nav-btn-secondary" onClick={gotologin}>Login</button>
                    <button className="nav-btn-primary" onClick={start}>Get Started</button>
                </div>
            </nav>
            <div className="hero">
                <div className="hero-txt">
                    <h1>Discover Your Next <br /><span>Perfect Outing</span></h1>
                    <p>You can now Easily Find a place for your next date-night, family otuing, birthday outing, single date and many more by using ai to find one within your budget or desired location.</p>
                    <div className="hero-txt-btns">
                            <button onClick={start}>Get Started</button>
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
            <div className="testimonials">
                <div className="testimonials-header">
                    <h2>What People Say</h2>
                    <p>Hear from early users who've found their perfect spots</p>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <LuStar color='yellow'/><LuStar color='yellow' /><LuStar color='yellow'/><LuStar  color='yellow'/><LuStarHalf color='yellow'/>
                        </div>
                        <p className="testimonial-quote">"Fun Spot made planning my sister's birthday so easy. Found an amazing beach spot within our budget in minutes!"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">S</div>
                            <div>
                                <span className="testimonial-name">Sarah Johnson</span>
                                <span className="testimonial-role">Event Planner</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <LuStar color='yellow'/><LuStar color='yellow'/><LuStar color='yellow'/><LuStar color='yellow'/><LuStar color='yellow' />
                        </div>
                        <p className="testimonial-quote">"I was skeptical at first but the AI recommendations were spot on. Best date night we've had in months!"</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">M</div>
                            <div>
                                <span className="testimonial-name">Michael Chen</span>
                                <span className="testimonial-role">Software Developer</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">
                            <LuStar color='yellow'/><LuStar color='yellow'/><LuStar color='yellow'/><LuStar color='yellow'/><LuStar color='yellow'/>
                        </div>
                        <p className="testimonial-quote">"Perfect for family outings! Found a beautiful resort that fit our whole family of 8. The budget breakdown was super helpful."</p>
                        <div className="testimonial-author">
                            <div className="testimonial-avatar">A</div>
                            <div>
                                <span className="testimonial-name">Amara Okafor</span>
                                <span className="testimonial-role">Teacher</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           <div className="faq">
            <div className="faq-header">
                <h2>Got Questions?</h2>
                <p>We've got answers</p>
            </div>
            <div className="faq-grid">
                {[
                    { q: "How does it plan my outings?", a: "It uses AI to find locations within your budget that match your theme. Just input your preferences and it handles the rest." },
                    { q: "Do I have to pay for Fun Spot?", a: "No, Fun Spot is completely free for now. Premium features may be added in the future." },
                    { q: "When is it going to be released?", a: "The full release date is coming soon. Early access is available right now!" },
                    { q: "Who created Fun Spot?", a: "Fun Spot was created by Fagboyegun Oluwatamilore, a software engineer passionate about making outing planning effortless." }
                ].map((item, i) => (
                    <div key={i} className={`faq-card ${openFaq === i ? 'open' : ''}`} onClick={() => setopenFaq(openFaq === i ? null : i)}>
                        <div className="faq-card-header">
                            <span>{item.q}</span>
                            {openFaq === i ? <LuMinus /> : <LuPlus />}
                        </div>
                        <div className="faq-card-body" style={{ maxHeight: openFaq === i ? '200px' : '0' }}>
                            <p>{item.a}</p>
                        </div>
                    </div>
                ))}
            </div>
           </div>
            <footer>
                <p>Copyright &copy; {new Date().getFullYear()} built by Fagboyegun Oluwatamilore</p>
            </footer>
        </div>
                        )
                    }
        </>
    )
}
export default Home;