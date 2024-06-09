import React, { useState, useContext } from 'react';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Styles/MachinesAddPage.css'

const MachinesAdd = () => {
    const { user } = useContext(UserContext);
    const [machineName, setMachineName] = useState('');
    const [topicName, setTopicName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const machineNames = [];
    const topicNames = [];
    const [selectedMachine, setSelectedMachine] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const handleMachineAdd = async (event) => {
        event.preventDefault();
        // setErrorMessage('');
    
        // need to add the api call for handling the machine addition

      };
      const handleMachineAssign = async (event) => {
        event.preventDefault();
        // setErrorMessage('');
    
        // need to add the api call for handling the machine addition

      };
    return (
        <div className='pageContainer'>
            <NavBar />
            <SideBar />
            <div className='machineDetails_Container'>
                <input 
                    name='machineName'
                    value={machineName}
                    placeholder='Enter Machine Name'
                    onChange={(e) => setMachineName(e.target.value)}
                />

                <input 
                    name='topicName'
                    value={topicName}
                    placeholder='Enter Topic Name'
                    onChange={(e) => setTopicName(e.target.value)}
                />
                
                <button onClick={handleMachineAdd}> Add Machine </button>

            </div>

            <div className='assignMachines_Container'>
                <select id="machines" value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)}>
                    <option value="" disabled>Select a machine</option>
                        {machineNames.map((machine, index) => (
                        <option key={index} value={machine}>
                            {machine}
                    </option>
                    ))}
                </select>

                <select id="topics" value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                    <option value="" disabled>Select a Topic</option>
                        {topicNames.map((topic, index) => (
                        <option key={index} value={topic}>
                            {topic}
                    </option>
                    ))}
                </select>

                <input 
                    type='email'
                    name='email'
                    value={userEmail}
                    placeholder='Enter User Email Address'
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                
                <button onClick={handleMachineAssign}> Assign Machine to User </button>

            </div>
        </div>
    );

}

export default MachinesAdd;