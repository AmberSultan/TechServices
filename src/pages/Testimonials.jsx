import React from 'react';
import './Testimonial.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const testimonials = [
    {
      imgSrc: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita.Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita",
      name: "Denis Richie"
    },
    {
      imgSrc: "https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita.",
      name: "Lisa Sthalekar"
    },
    {
      imgSrc: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita.",
      name: "Elizabith Richie"
    },
    {
      imgSrc: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita.",
      name: "Daniel Xavier"
    },
    {
      imgSrc: "https://images.pexels.com/photos/1832959/pexels-photo-1832959.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita.",
      name: "Emma Watson"
    },
    {
      imgSrc: "https://images.pexels.com/photos/718261/pexels-photo-718261.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      testimonial: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita.",
      name: "Mohammad Imran"
    }
  ];

function Testimonials() {
  return (
    <div>
       <div className="container mt-5">
      <h2 className="text-center mb-4">Client Testimonials</h2>
      <OwlCarousel
        className="owl-theme"
        autoplay
        autoplayTimeout={3000}
        autoplayHoverPause={false}
        items={1}
        stagePadding={20}
        center
        nav={false}
        margin={50}
        dots
        loop
        responsive={{
          0: { items: 1 },
          480: { items: 2 },
          575: { items: 2 },
          768: { items: 2 },
          991: { items: 3 },
          1200: { items: 4 }
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="item">
            <div className="card cardT">
              <div className="img-card imgCard">
                <img src={testimonial.imgSrc} alt={testimonial.name} />
              </div>
              <div className="testimonialDes mt-4 mb-2">
                {testimonial.testimonial}
              </div>
              <div className="name">
                {testimonial.name}
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
    </div>
  )
}

export default Testimonials
