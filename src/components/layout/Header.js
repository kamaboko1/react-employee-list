import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';

 const Header = () => {
  return (
    <div className="nav-wrapper">
       <nav className="nav">
         <h2>Employees</h2>
         <Link to="/">
             Home  
         </Link>
         <Link to="/employee/add">
             Add  
         </Link>
       </nav>
    </div>
  )
}

export default Header;