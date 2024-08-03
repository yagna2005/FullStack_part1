import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const HomePage = () => {
  return (

    <div className="home-container">
            <Navbar />

      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to HOMENEST</h1>
          <p>Your dream home is just a click away.</p>
          <Link to="/buy" className="cta-button">Find Your Home</Link>
        </div>
      </header>
      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Easy Search</h3>
            <p>Find the perfect home with our easy-to-use search filters and comprehensive listings.</p>
          </div>
          <div className="feature-card">
            <h3>Expert Advice</h3>
            <p>Get professional guidance from real estate experts to make informed decisions.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Transactions</h3>
            <p>Experience secure and seamless transactions with our trusted platform.</p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <Link to="/signup" className="cta-button">Sign Up Now</Link>
      </section>
      <Footer />
    </div>

  );
};

export default HomePage;
