import React from 'react';
import 'bulma/css/bulma.min.css';
import {useNavigate} from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  return <div>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" onClick={()=> navigate("/Cryptocurrency_tracker_app")}>
        <h1 className='title is-5' id='navbarTitle'>Crypto-tracker</h1>
    </a>
  </div>
  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a className="navbar-item" onClick={()=> navigate("/Cryptocurrency_tracker_app")}>
        Home
      </a>
    </div>
    <div className="navbar-end">
    </div>
  </div>
</nav>
  </div>;
}

export default Header;

