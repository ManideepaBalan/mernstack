import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
return (
   <header>
     <nav>
       <ul>
         <li><Link to="/">Dashboard</Link></li>
         <li><Link to="/about">About</Link></li>
         <li><Link to="/projects">Projects</Link></li>
         <li><Link to="/contact">Contact</Link></li>
       </ul>
     </nav>
   </header>
 );
};

export default Header;
