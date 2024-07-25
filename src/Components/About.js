import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>About Our E-commerce Website</h1>
          <p className="lead">
            This website was created by Sachin Sharma to provide the best online shopping experience. We offer a wide range of products with exceptional quality and customer service.
          </p>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <h3 className="text-center mb-3">Our Location</h3>
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps?q=Hyderabad,India&output=embed"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
