import img1 from '../assets/caucasian-family-is-enjoying-summer-vacation.jpg'
import img2 from '../assets/happy-woman-playing-arcade-game.jpg'
import img3 from '../assets/imgi_146_family-beach-with-sunset-background_1072992-1546.png'
function Home(){
    return(
        <>
        <div className="land">
            <nav>
                <h1>Fun <span>Spot</span></h1>
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
                <p>Detailed Explanation on how fun spot can help you</p>
                <div className="how-container">
                <div className="how-card">
                    <span>1</span>
                    <div className="card-detail">
                        <h3>Insert Information</h3>
                        <p>You have to input the location u want to have your outing the theme the number of people and budget aand let fun spot do the rest</p>
                    </div>
                </div>
                <div className="how-card">
                    <span>1</span>
                    <div className="card-detail">
                        <h3>Insert Information</h3>
                        <p>You have to input the location u want to have your outing the theme the number of people and budget aand let fun spot do the rest</p>
                    </div>
                </div>
                <div className="how-card">
                    <span>1</span>
                    <div className="card-detail">
                        <h3>Insert Information</h3>
                        <p>You have to input the location u want to have your outing the theme the number of people and budget aand let fun spot do the rest</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Home;