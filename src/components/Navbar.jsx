import React from 'react'
import logo from '../assets/Tj.png'


const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="https://taranjee.github.io/portfolio/">
            <img src={logo} alt="logo" width={40} />
          </a>
        </li>
        <li>
          <div className='about'>About Us </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar