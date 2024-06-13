import React, { useState, useEffect, useContext } from 'react';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { UserContext } from './UserContext';
import './Styles/Machines.css'
import { getAllMachines, deleteMachine } from './api';

function Machines() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user == null) {
        setIsLoading(true);
      } else {
        fetchMachines();
      }
    }, 100);

    return () => clearTimeout(timeout); // Cleanup timeout to prevent memory leaks
  }, [user]);

  const fetchMachines = async () => {
    try {
      const token = user.token; // Assuming you have a token in the user object
      const response = await getAllMachines(token);
      setMachines(response.results);
    } catch (err) {
      setError('Failed to fetch machines');
    }
  };

  const handleDelete = async (machineId, groupName, topicName) => {
    try {
      await deleteMachine(machineId, groupName, topicName, user.token);
      setMachines(machines.filter(machine => machine.id !== machineId));
    } catch (err) {
      setError('Failed to delete machine');
    }
  };

  if (isLoading) {
    return <div><h1 style={{ color: "White" }}>Please Login before trying to access this page <a href="/">Login Here</a></h1></div>;
  }

  return (
    <div className='pageContainer'>
      <NavBar />
      <SideBar />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className='scrollable-table'>
        <table>
          <thead>
            <tr>
              <th>Machine Name</th>
              <th>Topic Name</th>
              <th>Group Name</th>
              {user?.userType === 'IS_ADMIN' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {machines.length > 0 ? (
              machines.map(machine => (
                <tr key={machine.id}>
                  <td>{machine.machineName}</td>
                  <td>{machine.topicName}</td>
                  <td>{machine.groupName}</td>
                  {user?.userType === 'IS_ADMIN' && (
                    <td>
                      <button onClick={() => handleDelete(machine.id, machine.groupName, machine.topicName)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              user?.userType === 'IS_ADMIN' ? (
                <tr>
                  <td colSpan="4" style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>NO MACHINES ON BOARDED</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3" style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>NO MACHINES ARE ASSIGNED TO YOU</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Machines;