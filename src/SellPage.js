import React, { useState } from 'react';
import './SellPage.css';

const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const SellPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [owner, setOwner] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/png') {
      try {
        const base64 = await base64Encode(file);
        setImage(base64);
      } catch (error) {
        console.error('Error converting to base64:', error);
        setMessage('Error converting image to base64.');
      }
    } else {
      setMessage('Only PNG images are allowed.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      setMessage('Image is required.');
      return;
    }

    const base64Image = image; // Extract Base64 string from data URL

    const formData = {
      title,
      description,
      image: base64Image,
      owner,
      estimatedPrice,
      location,
      category,
    };

    try {
      const response = await fetch('http://localhost:8080/api/houses/addhouse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.text();
      console.log(result);

      // Clear form fields
      setTitle('');
      setDescription('');
      setImage('');
      setOwner('');
      setEstimatedPrice('');
      setLocation('');
      setCategory('');
    } catch (error) {
      console.error('Error submitting property:', error);
      setMessage('Error submitting property: ' + error.message);
    }
  };

  return (
    <div className="sell-page-container">
      <div className="sell-container">
        <h1>Sell Your House</h1>
        <form onSubmit={handleSubmit} className="sell-form">
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>
          <label>
            Image:
            <input
              type="file"
              accept=".png"
              onChange={handleFileChange}
              required
            />
          </label>
          <label>
            Owner:
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </label>
          <label>
            Estimated Price:
            <input
              type="text"
              value={estimatedPrice}
              onChange={(e) => setEstimatedPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Modern">Modern</option>
              <option value="Luxury">Luxury</option>
              <option value="Cozy">Cozy</option>
              <option value="Traditional">Traditional</option>
            </select>
          </label>
          <button type="submit">Submit</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SellPage;
