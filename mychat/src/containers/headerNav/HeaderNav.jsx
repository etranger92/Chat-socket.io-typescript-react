import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderNav.css';
const HeaderNav = () => {
  {
    const newLocal = 'About';
    return (
      <nav className='nav_container'>
        <ul className='nav_bar'>
          <li>
            {' '}
            <NavLink to={'/'}> HOME</NavLink>
          </li>
          <li>
            {' '}
            <NavLink to={'../about/About.jsx'}> About</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default HeaderNav;
