import {React, useState, useEffect, useContext} from 'react';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import { UserContext } from './UserContext';
function Machines() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user == null) {
        setIsLoading(true);
      }
       // After 2 seconds, stop showing loading message
    }, 100);

    return () => clearTimeout(timeout); // Cleanup timeout to prevent memory leaks
  }, []);


  if (isLoading) {
    return <div><h1 style={{color:"White"}}>Please Login before trying to access this page <a href="/"> Login Here</a></h1></div>; 
  }

  return (
    <div className='pageContainer'>
      <NavBar />
      <SideBar />
    </div>
  );
}

export default Machines;


