import style from '../css/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

  const [hamburgerClick, setHamburgerClick] = useState(false);

  const handleClick = (params) => {
     if(hamburgerClick === false) { 
       setHamburgerClick(true) 
      }
      else {
        setHamburgerClick(false)
      } 
  }

  return (       
    <div className={`${style.navbar} ${hamburgerClick && style.clickedHam}`}>
      <div className={style.hamburger} onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <Link className={style.link} onClick={handleClick} to="/">Hem</Link>
        <Link className={style.link} onClick={handleClick} to="/channels">Kanaler</Link>
        <Link className={style.link} onClick={handleClick} to="/programs">Program & Poddar</Link>
        <Link className={style.link} onClick={handleClick} to="/schedule">Tablå</Link>
      </div>
      <div className={style.profile}>
        <Link className={style.link} onClick={handleClick} to="/myprofile">Min profil</Link>
      </div>
    </div>
   );
}
 
export default Navbar;