import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ user }) => {
    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="/">Vidly</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                    <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                    <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                    {!user &&
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                            <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                        </React.Fragment>
                    }
                    {user &&
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/profile">{user.name}</NavLink>
                            <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                        </React.Fragment>
                    }
                </Nav>
            </Navbar.Collapse >
        </Navbar >
    );
}

export default NavBar;