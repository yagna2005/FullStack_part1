import React from 'react';
import './AboutPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <div className="about-navv">
      <Navbar />
    <div className="about-container">
      <div className="about-content">
        <div className="about-left">
          <div className="about-header">
            <h1>About Us</h1>
            <p>Learn more about who we are and what we do.</p>
          </div>
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At HOMENEST, our mission is to provide a seamless and enjoyable real estate experience for home buyers and sellers. We are dedicated to helping you find the perfect home or sell your property with ease.
            </p>
          </section>
          <section className="about-section">
            <h2>Our Vision</h2>
            <p>
              Our vision is to be the leading platform for real estate services, recognized for our commitment to innovation, transparency, and customer satisfaction. We aim to create a community where everyone can find their dream home.
            </p>
          </section>
          <section className="about-section">
            <h2>Meet the Team</h2>
            <div className="team-member">
              <img src="mem1.jpg" alt="Team Member 1" />
              <div className="team-info">
                <h3>Yagnanarayanan M</h3>
                <p>CEO & Founder</p>
              </div>
            </div>
            <div className="team-member">
              <img src="mem2.png" alt="Team Member 2" />
              <div className="team-info">
                <h3>Mathavan K</h3>
                <p>Head of Sales</p>
              </div>
            </div>
            <div className="team-member">
              <img src="mem3.jpg" alt="Team Member 3" />
              <div className="team-info">
                <h3>Vigneash M</h3>
                <p>Head of Sales</p>
              </div>
            </div>
          </section>
          <section className="about-section">
            <h2>Contact Us</h2>
            <p>Email: contact@homenest.com</p>
            <p>Phone: +0422 4455667</p>
            <p>Address: 20,Crosscut road,coimbatore 641042</p>
          </section>
        </div>
        <div className="about-right">
          <img src="about-photo.png" alt="About Us" />
        </div>
      </div>
    </div>
      <div className='nav-fff'>
    <Footer />
    </div>
    </div>
    
  );
};

export default AboutPage;
