import React from 'react';
import Home from './component/home';
import About from './component/about';
import Contact from './component/contact';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
    return (
        <> 
        <Router>
            <div className='router-names'>
                <nav>
                    <ul>
                          <li> <Link to="/">Home</Link></li>
                           <li> <Link to="/about">About</Link> </li>
                           <li><Link to="/contact">contact</Link> </li>
                    </ul>
                </nav>
                <h1 style={{color: "white", textAlign: "center", marginTop: "40px", fontSize: "45px" }} > Welcome !! To the Weather Forecast</h1>
                  <Routes>
                      <Route path='/' element={<Home/>} ></Route>
                      <Route path = '/about' element ={<About/>}></Route>
                      <Route path='/contact' element={<Contact/>}></Route>
                  </Routes>
            </div>
        </Router>
       
        </>
    )   
}


export default App;
