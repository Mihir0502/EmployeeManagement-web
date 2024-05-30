
import './App.css';
import { Home } from './Home';
import { Employee } from './Employee';
import { Department } from './Department';
import { BrowserRouter, Route, NavLink, Routes, } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">React App</h3>
        <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/Home">
                Home
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/Employee">
                Employee
              </NavLink>
            </li>
            <li className='nav-item m-1'>
              <NavLink className="btn btn-light btn-outline-primary" to="/Department">
                Department
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/home' Component={Home} />
          <Route path='/employee' Component={Employee} />
          <Route path='/department' Component={Department} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
