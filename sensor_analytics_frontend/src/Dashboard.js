import React from 'react';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import Chart from './Components/Chart';
import './Styles/Dashboard.css'; 
import { Link } from 'react-router-dom';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Dashboard() {
  return (
    <div className='pageContainer'>
        <NavBar />
        <SideBar />

        <Link to="/machines" className="dash-link">
            <div className='machineCountStatus'>
                <h1>Machines Assigned<FontAwesomeIcon icon={faCogs} size="2x" className="machineIcon" /></h1>
                <h5 id='machinesCount'>3</h5>
            </div>
        </Link>

        <div className='chartContainer'>
            <Chart />
        </div>
        
    </div>
  );
}

export default Dashboard;


