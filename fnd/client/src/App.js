
import React from 'react';
import{Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Pagenotfound from './pages/Pagenotfound';
import Contact from './pages/Contact';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';


function App() {
  return (
   <>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path ="/register" element={<Register/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path ="/dashboard" element={<Dashboard/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
      <Route path="*" element={<Pagenotfound/>}/>
      <Route path ="/contact" element={<Contact/>}/>
    </Routes>
    
   </>
  );
}

export default App;
