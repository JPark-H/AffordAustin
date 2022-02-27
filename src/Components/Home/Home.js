import "./Home.css"
import ImageSlider from "./Slideshow/ImageSlider";
import { SliderData } from "./Slideshow/SliderData";

//temp
const HomeBackground = 'https://res.cloudinary.com/djlo2drow/image/upload/v1645845219/BackgroundImg_teoyu0.jpg'

function Home () {
    return (
        <div className="background" >
            <ImageSlider slides={SliderData} />
        </div>
    );
}

export default Home