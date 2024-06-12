import React, { useContext, useEffect, useState } from 'react';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import Chart from './Components/Chart';
import './Styles/Dashboard.css';
import { Link } from 'react-router-dom';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from './UserContext';
import { faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { getAllMachines } from './api'; // Assuming this is the correct path to the API function

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [machines, setMachines] = useState([]);
  const [groups, setGroups] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const token = user.token;
        const data = await getAllMachines(token);
        
        // Extract the results from the response
        const machines = data.results;

        if (Array.isArray(machines) && machines.length > 0) {
          setMachines(machines);
          const uniqueGroups = [...new Set(machines.map(machine => machine.groupName))];
          setGroups(uniqueGroups);
        } else {
          setMachines([]);
        }
      } catch (error) {
        console.error('Error fetching machines:', error);
        setMachines([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user !== null) {
      fetchMachines();
    }
  }, [user]);

  const handleGroupChange = (event) => {
    const groupName = event.target.value;
    setSelectedGroup(groupName);
    setSelectedTopic('');

    const filteredTopics = machines.filter(machine => machine.groupName === groupName);
    setTopics(filteredTopics);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='pageContainer'>
      <NavBar />
      <SideBar />

      <div className='controls'>
        <select onChange={handleGroupChange} value={selectedGroup}>
          <option value=''>Select Group</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select onChange={handleTopicChange} value={selectedTopic} disabled={!selectedGroup}>
          <option value=''>Select Topic</option>
          {selectedGroup && topics.map((topic) => (
            <option key={topic.topicName} value={topic.topicName}>
              {topic.topicName}
            </option>
          ))}
        </select>
        <h5 style={{marginTop:"5px", padding: "0",width:"8rem",marginLeft:"5%",marginRight:"1%"}}>Select Chart Type</h5>
        <select onChange={handleChartTypeChange} value={chartType}>
          <option value='line'>Line</option>
          <option value='bar'>Bar</option>
        </select>
      </div>

      <Link to='/machines' className='dash-link'>
        <div className='machineCountStatus'>
          <h1>Machines Assigned<FontAwesomeIcon icon={faCogs} size='2x' className='machineIcon' /></h1>
          <h5 id='machinesCount'>3</h5>
        </div>
      </Link>

      <div className='chartContainer'>
        {selectedGroup && selectedTopic ? (
          <Chart groupName={selectedGroup} topicName={selectedTopic} chartType={chartType} />
        ) : (
          <h1 style={{marginTop:"28%"}}>
            {selectedGroup ? "Please select the Sensor's topic above" : "Please select the Sensor's group and topic above"}
          </h1>
        )}
      </div>

      {user?.userType === 'IS_ADMIN' && (
        <div className='adminOptions'>
          <Link to='/add_assign_machine' className='dash-link'>
            <button className='icon-button'>
              <FontAwesomeIcon icon={faPlus} />
              Add Machine
            </button>
          </Link>
          <Link to='/add_assign_machine' className='dash-link'>
            <button className='icon-button'>
              <FontAwesomeIcon icon={faUserPlus} />
              Assign Machine
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;