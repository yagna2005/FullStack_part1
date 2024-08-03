import React, { useState, useEffect } from 'react';
import './PlanAdmin.css';

const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const PlanAdmin = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    category: '',
    cent: '',
    estimatedAmount: '',
    engineerName: '',
    architect: '',
    mobileNumber: '',
    sampleImage: '',
    blueprint: '',
  });

  const categories = ['Residential', 'Commercial', 'Industrial'];

  useEffect(() => {
    fetch('http://localhost:8080/api/plans')
      .then(response => response.json())
      .then(data => setPlans(data))
      .catch(error => console.error('Error fetching plans:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlan(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (files[0].type !== 'image/png') {
        alert('Please upload a PNG file.');
        return;
      }
      try {
        const base64 = await base64Encode(files[0]);
        setNewPlan(prevState => ({ ...prevState, [name]: base64 }));
      } catch (error) {
        console.error('Error converting to base64:', error);
      }
    }
  };

  const handleAddPlan = () => {
    fetch('http://localhost:8080/api/plans/addplan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlan),
    })
      .then(response => response.json())
      .then(data => {
        setPlans(prevPlans => [...prevPlans, data]);
        setNewPlan({
          category: '',
          cent: '',
          estimatedAmount: '',
          engineerName: '',
          architect: '',
          mobileNumber: '',
          sampleImage: '',
          blueprint: '',
        });
      })
      .catch(error => console.error('Error adding plan:', error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPlan(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
  };

  const handleUpdatePlan = () => {
    fetch(`http://localhost:8080/api/plans/${editingPlan.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingPlan),
    })
      .then(response => response.json())
      .then(() => {
        setPlans(prevPlans => prevPlans.map(plan => (plan.id === editingPlan.id ? editingPlan : plan)));
        setEditingPlan(null);
      })
      .catch(error => console.error('Error updating plan:', error));
  };

  const handleDeletePlan = (id) => {
    fetch(`http://localhost:8080/api/plans/${id}`, { method: 'DELETE' })
      .then(() => {
        setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id));
      })
      .catch(error => console.error('Error deleting plan:', error));
  };

  return (
    <div className="admin-page-container">
      <aside className="sidebar">
        <h2>Customer Details</h2>
      </aside>

      <main className="main-content">
        <h1>Plan Admin</h1>

        <div className="add-plan-form">
          <h2>Add New Plan</h2>
          <select name="category" value={newPlan.category} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <input type="text" name="cent" placeholder="Cent" value={newPlan.cent} onChange={handleChange} />
          <input type="text" name="estimatedAmount" placeholder="Estimated Amount" value={newPlan.estimatedAmount} onChange={handleChange} />
          <input type="text" name="engineerName" placeholder="Engineer Name" value={newPlan.engineerName} onChange={handleChange} />
          <input type="text" name="architect" placeholder="Architect" value={newPlan.architect} onChange={handleChange} />
          <input type="text" name="mobileNumber" placeholder="Mobile Number" value={newPlan.mobileNumber} onChange={handleChange} />
          <input type="file" name="sampleImage" accept="image/png" onChange={handleFileChange} />
          <input type="file" name="blueprint" accept="image/png" onChange={handleFileChange} />
          <button type="submit" onClick={handleAddPlan}>Submit</button>
        </div>

        <div className="plan-list">
          <h2>Plan List</h2>
          {plans.map((plan, index) => (
            <div key={index} className="plan-item">
              <h3>{plan.category}</h3>
              <p><strong>Cent:</strong> {plan.cent}</p>
              <p><strong>Estimated Amount:</strong> {plan.estimatedAmount}</p>
              <p><strong>Engineer Name:</strong> {plan.engineerName}</p>
              <p><strong>Architect:</strong> {plan.architect}</p>
              <p><strong>Mobile Number:</strong> {plan.mobileNumber}</p>
              <div className="plan-images">
                {plan.sampleImage && <img src={plan.sampleImage} alt="Sample" />}
                {plan.blueprint && <img src={plan.blueprint} alt="Blueprint" />}
              </div>
              <button onClick={() => handleEditPlan(plan)}>Edit</button>
              <button onClick={() => handleDeletePlan(plan.id)}>Delete</button>
            </div>
          ))}
        </div>

        {editingPlan && (
          <div className="edit-plan-form">
            <h2>Edit Plan</h2>
            <select name="category" value={editingPlan.category} onChange={handleEditChange}>
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <input type="text" name="cent" placeholder="Cent" value={editingPlan.cent} onChange={handleEditChange} />
            <input type="text" name="estimatedAmount" placeholder="Estimated Amount" value={editingPlan.estimatedAmount} onChange={handleEditChange} />
            <input type="text" name="engineerName" placeholder="Engineer Name" value={editingPlan.engineerName} onChange={handleEditChange} />
            <input type="text" name="architect" placeholder="Architect" value={editingPlan.architect} onChange={handleEditChange} />
            <input type="text" name="mobileNumber" placeholder="Mobile Number" value={editingPlan.mobileNumber} onChange={handleEditChange} />
            <input type="file" name="sampleImage" accept="image/png" onChange={handleFileChange} />
            <input type="file" name="blueprint" accept="image/png" onChange={handleFileChange} />
            <button onClick={handleUpdatePlan}>Update Plan</button>
            <button onClick={() => setEditingPlan(null)}>Cancel</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlanAdmin;
