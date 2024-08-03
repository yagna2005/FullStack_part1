import React, { useState, useEffect } from 'react';
import './PlanPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const PlanPage = () => {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/plans/getall');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched plans:', data);
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCardClick = (plan) => {
    setSelectedPlan(plan);
  };

  const filteredPlans = plans.filter(plan => {
    return (
      (plan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.cent.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory ? plan.category === selectedCategory : true)
    );
  });

  return (
    <div className='plan-cssss'>

    
      <Navbar />
    <div className="plan-container">
      <h1>House Plans</h1>
      {selectedPlan ? (
        <div className="plan-details">
          <h2>{selectedPlan.category}</h2>
          <img src={selectedPlan.sampleImage} alt={selectedPlan.category} />
          <p><strong>Cent:</strong> {selectedPlan.cent}</p>
          <p><strong>Estimated Amount:</strong> {selectedPlan.estimatedAmount}</p>
          <p><strong>Engineer Name:</strong> {selectedPlan.engineerName}</p>
          <p><strong>Architect:</strong> {selectedPlan.architect}</p>
          <p><strong>Mobile Number:</strong> {selectedPlan.mobileNumber}</p>
          {selectedPlan.blueprint && (
            <>
              <h3>Blueprint</h3>
              <img src={selectedPlan.blueprint} alt="Blueprint" />
            </>
          )}
          <button onClick={() => setSelectedPlan(null)}>Back to List</button>
        </div>
      ) : (
        <div className="plan-list">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by category or cent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="Basic Plan">Basic Plan</option>
              <option value="Premium Plan">Premium Plan</option>
              {/* Add more options based on your categories */}
            </select>
          </div>
          <div className="plans">
            {filteredPlans.slice(0, 5).map((plan, index) => (
              <div key={index} className="plan-card" onClick={() => handleCardClick(plan)}>
                <img src={plan.sampleImage} alt={plan.category} />
                <h3>{plan.category}</h3>
                <p><strong>Cent:</strong> {plan.cent}</p>
                <p><strong>Estimated Amount:</strong> {plan.estimatedAmount}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
      <Footer />
    </div>
  );
};

export default PlanPage;
