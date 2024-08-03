import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './CustomerSupportPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const CustomerSupportForm = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const templateParams = {
      email: email,
      subject: title,
      message: description,
    };

    emailjs.send('service_k8djvgh', 'template_wyyg2my', templateParams, 'LDFvKvIKMwonVdrnU')
      .then((response) => {
        alert('Your message has been sent!');
        setEmail(email);
        setTitle('');
        setDescription('');
      })
      .catch((err) => {
        alert('There was a problem sending your message.');
        console.error(err);
      });
  };

  return (
    <div className='newsss'>
      <Navbar />
    <div className="customer-support-form">
      <div className="customer-support-form-container">
      <h2>Customer Support</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <center><button type="submit">Send</button></center>
      </form>
      </div>
      
    </div>
    <div className='foootttt'>
        <Footer />
    </div>
    </div>
  );
};

export default CustomerSupportForm;
