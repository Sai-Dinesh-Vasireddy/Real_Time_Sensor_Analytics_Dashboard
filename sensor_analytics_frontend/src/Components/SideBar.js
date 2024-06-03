import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartBar, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; 
import '../Styles/SideBar.css';

function SideBar() {
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="sidebar-link"><FaHome /></Link>
      <Link to="/graphs" className="sidebar-link"><FaChartBar /></Link>
      <Link to="/profile" className="sidebar-link"><FaUser /></Link>
      <Link to="/settings" className="sidebar-link"><FaCog /></Link>
      <Link to="/logout" className="sidebar-link"><FaSignOutAlt /></Link>
    </div>
  );
}

export default SideBar;