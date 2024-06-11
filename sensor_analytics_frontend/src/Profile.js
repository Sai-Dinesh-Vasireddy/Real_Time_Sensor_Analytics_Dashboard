import {React, useContext} from 'react';
import './Styles/Profile.css';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { UserContext } from './UserContext';


const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
        <NavBar />
        <SideBar />
        
        <div className="profile-container">
            <h3>My Profile</h3>
        <div className="profile-field">
            <label htmlFor="username">Username:</label>
            <input
            type="text"
            id="username"
            value={user.username}
            disabled
            />
        </div>
        <div className="profile-field">
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            id="email"
            value={user.email}
            disabled
            />
        </div>
        </div>
    </div>
  );
};

export default Profile;