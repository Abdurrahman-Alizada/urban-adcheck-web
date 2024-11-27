// components/TestimonialSlider.js
import Slider from 'react-slick';

const TestimonialSlider = ({ testimonials }) => {
  // Add slick carousel settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
    {testimonials.map((testimonial, index) => (
      <div key={index}>
        <h3>{testimonial.name}</h3>
        <p>{testimonial.text}</p>
        <img src={testimonial.profilePic} alt={testimonial.name} />
      </div>
    ))}
  </Slider>
  );
};

export default TestimonialSlider;
