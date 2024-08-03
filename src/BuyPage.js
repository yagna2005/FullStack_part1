import React, { useState, useEffect } from 'react';
import './BuyPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const BuyPage = () => {
    const [houses, setHouses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedHouse, setSelectedHouse] = useState(null);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/houses/getall');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched houses:', data);
                setHouses(data);
            } catch (error) {
                console.error('Error fetching houses:', error);
            }
        };

        fetchHouses();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleCardClick = (house) => {
        setSelectedHouse(house);
    };

    const filteredHouses = houses.filter((house) => {
        return (
            (house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                house.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedCategory ? house.category === selectedCategory : true)
        );
    });

    return (
        <div className="buy-container">
            <Navbar />
            <h1>Buy a House</h1>
            {selectedHouse ? (
                <div className="house-details">
                    <h2>{selectedHouse.title}</h2>
                    <img
                        src={selectedHouse.image}
                        alt={selectedHouse.title}
                    />
                    <p>{selectedHouse.description}</p>
                    <p>
                        <strong>Owner:</strong> {selectedHouse.owner}
                    </p>
                    <p>
                        <strong>Estimated Price:</strong> {selectedHouse.estimatedPrice}
                    </p>
                    <p>
                        <strong>Location:</strong> {selectedHouse.location}
                    </p>
                    <button onClick={() => setSelectedHouse(null)} className="back-button">
                        Back to Listings
                    </button>
                </div>
            ) : (
                <>
                    <div className="search-filter">
                        <input
                            type="text"
                            placeholder="Search houses..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-bar"
                        />
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="filter-select"
                        >
                            <option value="">All Categories</option>
                            <option value="Modern">Modern</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Cozy">Cozy</option>
                            <option value="Traditional">Traditional</option>
                        </select>
                    </div>
                    <div className="houses-list">
                        {filteredHouses.map((house) => (
                            <div key={house.id} className="house-card" onClick={() => handleCardClick(house)}>
                                <img
                                    src={house.image}
                                    alt={house.title}
                                />
                                <h3>{house.title}</h3>
                                <p>{house.location}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className='foot'>
            <Footer />
            </div>
        </div>
    );
};

export default BuyPage;
