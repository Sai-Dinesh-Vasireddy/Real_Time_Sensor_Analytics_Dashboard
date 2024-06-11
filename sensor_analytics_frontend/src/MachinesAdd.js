import React, { useState, useContext, useEffect } from 'react';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Styles/MachinesAddPage.css';
import { onboardNewSensor, assignMachineToUser, getAllMachines } from './api';

const MachinesAdd = () => {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [groupName, setGroupName] = useState('');
    const [topicName, setTopicName] = useState('');
    const [userName, setUserName] = useState('');
    const [machineNames, setMachineNames] = useState([]);
    const [topicNames, setTopicNames] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (user !== null) {
          setIsLoading(false);
          fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const data = await getAllMachines(user.token);
            setMachineNames(data.results.map(machine => machine.groupName));
            setTopicNames(data.results.map(machine => machine.topicName));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    if (isLoading) {
        return <div>Loading...</div>; 
    }

    const handleMachineAdd = async (event) => {
        event.preventDefault();
        setErrorMessage('');
    
        const machineName = `${groupName}_${topicName}`;

        try {
            await onboardNewSensor(groupName, topicName, machineName, user.token);
            console.log('Machine added successfully');
            // Reset input values
            setGroupName('');
            setTopicName('');
            // Show success alert
            alert('Machine added successfully');
            // Fetch updated data
            fetchData();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleMachineAssign = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        const machineName = `${selectedGroup}_${selectedTopic}`;

        try {
            await assignMachineToUser(userName, machineName, user.token);
            console.log('Machine assigned successfully');
            // Reset input values
            setSelectedGroup('');
            setSelectedTopic('');
            setUserName('');
            // Show success alert
            alert('Machine assigned successfully');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className='pageContainer'>
            <NavBar />
            <SideBar />
            <div className='sensorDetails_Container'>
                <input 
                    name='groupName'
                    value={groupName}
                    placeholder='Enter Group Name'
                    onChange={(e) => setGroupName(e.target.value)}
                />

                <input 
                    name='topicName'
                    value={topicName}
                    placeholder='Enter Topic Name'
                    onChange={(e) => setTopicName(e.target.value)}
                />
                
                <button onClick={handleMachineAdd}> Add Machine </button>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>

            <div className='assignSensors_Container'>
                <select id="groups" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value="" disabled>Select a Group</option>
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
                    name='Username'
                    value={userName}
                    placeholder='Enter Username'
                    onChange={(e) => setUserName(e.target.value)}
                />
                
                <button onClick={handleMachineAssign}> Assign Machine to User </button>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default MachinesAdd;