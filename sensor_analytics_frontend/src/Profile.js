import {React, useContext, useState, useEffect} from 'react';
import './Styles/Profile.css';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { UserContext } from './UserContext';


const Profile = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user == null) {
        setIsLoading(true);
      } else {
        setUserName(user.username);
        setEmail(user.email);
      }
    }, 0);
}, [user]);
if (isLoading) {
  return <div><h1 style={{color:"White"}}>Please Login before trying to access this page <a href="/"> Login Here</a></h1></div>; 
}
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
            value={username}
            disabled
            />
        </div>
        <div className="profile-field">
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            id="email"
            value={email}
            disabled
            />
        </div>
        </div>
    </div>
  );
};

export default Profile;