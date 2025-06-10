import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Events from './pages/events/Events';
import Navbar from './components/navigation/Navbar';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Homepage />} /> {/* Homepage route */}
          <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
