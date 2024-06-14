import React, { useState, useEffect, useContext } from 'react';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { UserContext } from './UserContext';
import './Styles/Machines.css'
import { getAllMachines, deleteMachine } from './api';
import { useNavigate } from 'react-router-dom';

function Machines() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user == null) {
        navigate('/');
      } else {
        fetchMachines();
      }
    }, 100);

    return () => clearTimeout(timeout); // Cleanup timeout to prevent memory leaks
  }, [user, machines]);

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
              {user?.userType === 'IS_ADMIN' && <th>Users</th>}
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
                    <>
                      {machine?.users.length > 0 ? (<td>{machine.users.join(', ')}</td>) : (<td>No User Assigned</td>)}
                      <td>
                        <button onClick={() => handleDelete(machine.id, machine.groupName, machine.topicName)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              user?.userType === 'IS_ADMIN' ? (
                <tr>
                  <td colSpan="5" style={{ color: "black", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>NO MACHINES ON BOARDED</td>
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