import './App.css';

import Navbar from './myComponents/Navbar';
import Home from './myComponents/Home';
import Fotter from './myComponents/Fotter';
import { Route,Routes } from 'react-router-dom';
import About from './myComponents/About';
import Login from './myComponents/Login';
import Signup from './myComponents/Signup';
import Support from './myComponents/support';
import News from './myComponents/News';
import Screnner from './myComponents/Screnner';
import CompanyDetails from './myComponents/CompanyDetails';
function App() {
  return (
  <>
  <Navbar/>
  
  <Routes>
   <Route path="/" element={<Home/>}/> 
    
    <Route path='/company/:symbol'element={<CompanyDetails/>}/>

    <Route path="/about" element={<About/>}/> 
    <Route path="/login" element={<Login/>}/> 
    <Route path="/signup" element={<Signup/>}/> 
    <Route path="/news" element={<News/>}/> 
    <Route path="/support" element={<Support/>}/> 
    <Route path="/screnner" element={<Screnner/>}/> 
  </Routes>
    <Fotter/>
  </>  
  );
}

export default App;
