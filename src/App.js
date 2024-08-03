import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutPage from './AboutPage';
import BuyPage from './BuyPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import PlanPage from './PlanPage';
import SignupPage from './SignupPage';
import AdminDashboard from './AdminDashboard';
import SellPage from './SellPage';
import PlanAdmin from './PlanAdmin';
import SupportPage from './CustomerSupportPage';
import HouseList from './HouseList';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/sell" element={<SellPage />}/>
        <Route path="/admin/PlanAdmin" element={<PlanAdmin />}/>
        <Route path="/customersupport" element={<SupportPage />}/>
        <Route path="/admin/HouseList" element={<HouseList />}/>
      </Routes>
    </Router>
  );
};

export default App;
