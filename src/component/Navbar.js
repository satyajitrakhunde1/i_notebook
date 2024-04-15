import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate();
  
  const handlelogout =()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }

  let location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand px-2" to="/">
          <strong>iNotebook</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Conditional rendering for login/logout buttons */}
        {localStorage.getItem('token') ? (
          <button className="btn btn-primary" onClick={handlelogout}>Logout</button> 
        ) : (
          <div> {/* Wrap elements in a parent div */}
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link> 
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
