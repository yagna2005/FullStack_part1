import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  editForm: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '10px',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  formTextarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    height: '100px',
  },
  formButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginRight: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  formButtonHover: {
    backgroundColor: '#0056b3',
  },
  houseDetails: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  houseDetailsImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  backButtonHover: {
    backgroundColor: '#5a6268',
  },
  searchFilter: {
    marginBottom: '20px',
  },
  searchBar: {
    width: 'calc(100% - 120px)',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
  },
  filterSelect: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  housesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  houseCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    width: 'calc(33% - 20px)',
    cursor: 'pointer',
    transition: 'none', // Removed transition effects
  },
  houseCardImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  houseCardTitle: {
    marginTop: '10px',
    fontSize: '1.2em',
  },
  houseCardText: {
    margin: '5px 0',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: '0.9em',
  },
  editButtonHover: {
    backgroundColor: '#0056b3',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    fontSize: '0.9em',
  },
  deleteButtonHover: {
    backgroundColor: '#c82333',
  },
  cardContent: {
    display: 'none', // Hidden content
  },
};

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/houses/getall');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/plans/getall');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchHouses();
    fetchPlans();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCardClick = (item) => {
    setSelectedHouse(item);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDeleteClick = async (item) => {
    try {
      const response = await fetch(`http://localhost:8080/api/${selectedType.toLowerCase()}/delete/${item.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setHouses(houses.filter(house => house.id !== item.id));
      setPlans(plans.filter(plan => plan.id !== item.id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/${selectedType.toLowerCase()}/update/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setIsEditing(false);
      setEditingItem(null);
      // Re-fetch data or update state to reflect changes
      const fetchHouses = async () => {
        const response = await fetch('http://localhost:8080/api/houses/getall');
        const data = await response.json();
        setHouses(data);
      };
      const fetchPlans = async () => {
        const response = await fetch('http://localhost:8080/api/plans/getall');
        const data = await response.json();
        setPlans(data);
      };
      fetchHouses();
      fetchPlans();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const filteredData = (() => {
    let data = [];
    if (selectedType === 'Buy' || selectedType === 'All') {
      data = [...data, ...houses];
    }
    if (selectedType === 'Plan' || selectedType === 'All') {
      data = [...data, ...plans];
    }

    return data.filter((item) => {
      return (
        (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory ? item.category === selectedCategory : true)
      );
    });
  })();

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Houses</h1>
      {isEditing ? (
        <div style={styles.editForm}>
          <h2>Edit {editingItem.title || editingItem.category}</h2>
          <form onSubmit={handleEditSubmit}>
            <label style={styles.formLabel}>
              Title:
              <input
                type="text"
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                style={styles.formInput}
                required
              />
            </label>
            <label style={styles.formLabel}>
              Description:
              <textarea
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                style={styles.formTextarea}
                required
              ></textarea>
            </label>
            <label style={styles.formLabel}>
              Category:
              <input
                type="text"
                value={editingItem.category || ''}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                style={styles.formInput}
                required
              />
            </label>
            <button type="submit" style={styles.formButton} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.formButtonHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.formButton.backgroundColor}>Save</button>
            <button type="button" style={styles.formButton} onClick={() => setIsEditing(false)} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.formButtonHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.formButton.backgroundColor}>Cancel</button>
          </form>
        </div>
      ) : selectedHouse ? (
        <div style={styles.houseDetails}>
          <h2>{selectedHouse.title || selectedHouse.category}</h2>
          <img src={selectedHouse.image || selectedHouse.sampleImage} alt={selectedHouse.title || selectedHouse.category} style={styles.houseDetailsImg} />
          <p>{selectedHouse.description}</p>
          <p><strong>Owner:</strong> {selectedHouse.owner}</p>
          <p><strong>Estimated Price:</strong> {selectedHouse.estimatedPrice}</p>
          <p><strong>Location:</strong> {selectedHouse.location}</p>
          <p><strong>Cent:</strong> {selectedHouse.cent}</p>
          <p><strong>Engineer Name:</strong> {selectedHouse.engineerName}</p>
          <p><strong>Architect:</strong> {selectedHouse.architect}</p>
          <p><strong>Mobile Number:</strong> {selectedHouse.mobileNumber}</p>
          <button onClick={() => setSelectedHouse(null)} style={styles.backButton} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.backButtonHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.backButton.backgroundColor}>
            Back to Listings
          </button>
        </div>
      ) : (
        <>
          <div style={styles.searchFilter}>
            <input
              type="text"
              placeholder="Search houses..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={styles.searchBar}
            />
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={styles.filterSelect}
            >
              <option value="">All Categories</option>
              <option value="Modern">Modern</option>
              <option value="Luxury">Luxury</option>
              <option value="Cozy">Cozy</option>
              <option value="Traditional">Traditional</option>
              <option value="Basic Plan">Basic Plan</option>
              <option value="Premium Plan">Premium Plan</option>
            </select>
            <select
              value={selectedType}
              onChange={handleTypeChange}
              style={styles.filterSelect}
            >
              <option value="All">All Types</option>
              <option value="Buy">Buy</option>
              <option value="Plan">Plan</option>
            </select>
          </div>
          <div style={styles.housesList}>
            {filteredData.map((item) => (
              <div key={item.id || item.cent} style={styles.houseCard}>
                <img src={item.image || item.sampleImage} alt={item.title || item.category} style={styles.houseCardImg} />
                <h3 style={styles.houseCardTitle}>{item.title || item.category}</h3>
                <p style={styles.houseCardText}>{item.location}</p>
                <button onClick={() => handleEditClick(item)} style={styles.editButton} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.editButtonHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.editButton.backgroundColor}>Edit</button>
                <button onClick={() => handleDeleteClick(item)} style={styles.deleteButton} onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor}>Delete</button>
                <div style={styles.cardContent} onClick={() => handleCardClick(item)}></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HouseList;
