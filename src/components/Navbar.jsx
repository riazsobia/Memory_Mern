import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './navbar.css';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">MERN Auth</Link>
            <NavLink className="nav-link" exact to="/">Home</NavLink>
            <NavLink className="nav-link"  to="/about">About</NavLink>
                {
                    props.isAuth 
                    ? 
                    <>
                        <NavLink className="nav-link"  to="/profile">Profile</NavLink>
                        <span onClick={props.handleLogout} className="logout">Logout</span>
                    </>
                    : 
                    <>
                        <NavLink className="nav-link"  to="/signup">Create Account</NavLink>
                        <NavLink className="nav-link"  to="/login">Login</NavLink>
                    </>
                }
        </nav>
    );
}

export default Navbar;