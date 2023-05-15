import { useState } from 'react';
import {BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import TestComponent from '~component/TestComponent';
import DepthComponent from '~component/depth/DepthComponent';
import Home from '~component/Home';
import About from '~component/About';
import { TestContext } from '~context/TestContext';

function App (){

  // for context API test
  const [check, setCheck] = useState(false);

  return(
    <React.Fragment>
      {/* ROUTER TEST */}
      <BrowserRouter>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        
        <div className="linkBox">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>

      {/* context, hook, img path, background-image path TEST */}
      <TestContext.Provider value={{check, setCheck}}>
        <TestComponent />
      </TestContext.Provider>

      {/* depth directory img path test */}
      <DepthComponent/>
      
    </React.Fragment>

  );
};

export default App;