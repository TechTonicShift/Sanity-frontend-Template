import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Fetch data from the API
        let PROJECT_ID = "la7e5sle";
        let DATASET = "production";
        let QUERY = encodeURIComponent('*[_type == "blog"]');
        let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

        const response = await fetch(URL);
        const data = await response.json();

        // Check if data.result is an array before setting slides
        if (Array.isArray(data.result)) {
          setSlides(data.result);
        } else {
          console.error('Data received from the API does not contain an array of blog entries.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.link}
            alt={slide.title}
            className={index === currentSlide ? "slide" : "slide slide-hidden"}
            style={{ width: "100%", height: "100%" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
