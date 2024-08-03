import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './AdminDashboard.css';
import SellPage from './SellPage';
import PlanAdmin from './PlanAdmin';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [buyPageTotal, setBuyPageTotal] = useState(0);
  const [planPageTotal, setPlanPageTotal] = useState(0);
  const [totalHousesForSale, setTotalHousesForSale] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [isUserDetailsExpanded, setIsUserDetailsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalHouses = async () => {
      try {
        const buyPageResponse = await fetch('http://localhost:8080/api/houses/getall');
        const planPageResponse = await fetch('http://localhost:8080/api/plans/getall');
        
        if (!buyPageResponse.ok || !planPageResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const buyPageData = await buyPageResponse.json();
        const planPageData = await planPageResponse.json();

        const buyPageTotal = Array.isArray(buyPageData) ? buyPageData.length : 0;
        const planPageTotal = Array.isArray(planPageData) ? planPageData.length : 0;

        const total = buyPageTotal + planPageTotal;
        setBuyPageTotal(buyPageTotal);
        setPlanPageTotal(planPageTotal);
        setTotalHousesForSale(total);
      } catch (error) {
        console.error('Error fetching total houses:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const userResponse = await fetch('http://localhost:8080/login/getuser');
        
        if (!userResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await userResponse.json();
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.message);
      }
    };

    fetchTotalHouses();
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Admin Dashboard</h2>
        </div>
        <ul className="sidebar-nav">
          <li><Link to="/admin/sell">Add House</Link></li>
          <li><Link to="/admin/PlanAdmin">Plan</Link></li>
          <li><Link to="/admin/HouseList">HouseList</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        </ul>
      </aside>
      <main className="main-content">
        <div className="top-cards">
          <div className="card total-houses">
            <h3>Total Houses for Sale</h3>
            <p>{totalHousesForSale}</p>
          </div>
          <div 
            className={`card user-details ${isUserDetailsExpanded ? 'expanded' : ''}`}
            onClick={() => setIsUserDetailsExpanded(!isUserDetailsExpanded)}
          >
            <h3>User Details</h3>
            {userDetails.length > 0 ? (
              userDetails.map((user, index) => (
                <div key={index}>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.role}</p>
                </div>
              ))
            ) : (
              <p>No user details available</p>
            )}
          </div>
        </div>
        <div className="graph-container">
          <h3>Total Sales</h3>
          <Bar
            data={{
              labels: ['BuyPage', 'PlanPage', 'Total'],
              datasets: [
                {
                  label: 'Number of Houses',
                  data: [buyPageTotal, planPageTotal, totalHousesForSale],
                  backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                  borderColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
        <Routes>
          <Route path="/sell" element={<SellPage />} />
          <Route path="/PlanAdmin" element={<PlanAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
