import logo from './logo.svg';
import './Styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Machines from './Machines';
import Graphs from './Graphs';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/graphs" element={<Graphs />} />
        </Routes>
    </Router>               
  );
}

export default App;
