import "./Home.css"

//temp
const HomeBackground = 'https://res.cloudinary.com/djlo2drow/image/upload/v1645845219/BackgroundImg_teoyu0.jpg'

function Home () {
    return (
        <div className="background" >
            <img classname="background" style={{opacity: 0.3}} src={HomeBackground} />
            
        </div>
    );
}

export default Home