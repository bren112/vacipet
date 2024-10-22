import React, {useState} from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
// import logo from './abobora.png';
function Navbar() {
    const [active , setActive] = useState("nav__menu");
    const [toggleIcon , setToggleIcon] = useState("nav__toggler"); 

    const navToggle = () =>{
        active === 'nav__menu' ? setActive('nav__menu nav__active') : setActive('nav__menu');

        toggleIcon === 'nav_toggler' ? 
        setToggleIcon('nav__toggler toggle')
        : setToggleIcon("nav__toggler")
    }


  return (
    <nav className='nav'>
      <div className="logo">
        {/* <img src={logo} alt="" srcset="" id='img'/> */}
    <Link to="/" className="nav__brand" id='logo'>VACIPET</Link>
      </div>
    <ul className={active}>
        <li className="nav__item"><Link to="/" className="nav__link">Home</Link></li>
        <li className="nav__item"><Link to="/sobre" className="nav__link">Sobre</Link></li>
        <li className="nav__item"><Link to="/contatos" className="nav__link">Contatos</Link></li>
        <li className="nav__item"><Link to="/saiba" className="nav__link">Saiba Mais</Link></li>
        <li className="nav__item"><Link to="/pets" className="nav__link">Meus Pets</Link></li>
        <li className="nav__item"><Link to="/loc" className="nav__link">Localização</Link></li>
       
    </ul>
    <div onClick={navToggle} className={toggleIcon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
    </div>
</nav>
  )
}

export default Navbar;
