import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setAuthNavbarAction, setGuestNavbarAction } from "../../redux/navbar-authenticate/navbar-authenticate-action";
import { logoutAuthenticateAction } from "../../redux/login-authenticate/login-authenticate-action";

const Navbar = () => {
  //navAuth reducer
  const { routeList } = useSelector(state => state.navbarAuthenticateReducer);
  
  const routeTitle = {
    profiles: 'Developer',
    register: 'Register',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
  }
  
  const dispatcher = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token') !== '') {
      dispatcher(setAuthNavbarAction());
    } else {
      dispatcher(setGuestNavbarAction(['profiles', 'register', 'login']));
    }
  }, [])

  /**
   * Logout handler
   * Handling render list of route
   */
  const clickHandler = (e) => {
    if (e.target.name === 'logout') {
      dispatcher(logoutAuthenticateAction());
      dispatcher(setGuestNavbarAction(['profiles', 'register', 'login']));
    }
  }

  return <>
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i>
          DevConnector
        </Link>
      </h1>
      <ul>
        { routeList.map((route) => {
          const linkTo = route === 'logout' ? '' : route;
          return <li key={ route }>
            <Link 
              to={ `/${ linkTo }` } 
              name={ route } 
              onClick={ clickHandler }>
              { routeTitle[route] }
            </Link>
          </li>
        }) } 
      </ul>
    </nav>
  </>
}

export default Navbar;