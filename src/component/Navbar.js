import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  // Getting the location (like "/" "/about"). We can write logic accordingly
  let location = useLocation();

  // useEffect(() => {
    console.log(location.pathname);
  // }, [location]);

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
              {/* Added the text "About" inside the Link */}
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
          <form className="d-flex">
  <Link className="btn btn-primary mx-2" to="/login" role="button">Login </Link>
  <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link> 
</form>
      </nav>
    </div>
  );
};

export default Navbar;
