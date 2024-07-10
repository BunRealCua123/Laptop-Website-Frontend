import Slider from 'react-slick';
import './slidercomonent.css';

function SlideComponent({ arrs }) {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: true,
        dots: false
    };
    return (
        <div style={{ width: '700px', height: 300, marginTop:5}}>
            <Slider {...settings}>
                {arrs.map((slide) => {
                    return (
                        <img
                            key={slide}
                            className="slideImg"
                            src={slide}
                            alt="slide"
                        />
                    );
                })}
            </Slider>
        </div>
    );
}

export default SlideComponent;
