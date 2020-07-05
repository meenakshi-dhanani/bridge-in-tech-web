import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom"
import { AuthConsumer }  from "./AuthContext";


function Navigation() {
    
    return (
        <AuthConsumer>
        {({ isAuth, login, logout }) => (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        className="d-inline-block align-top"
                        src="public/assets/images/AnitaBLogo.png"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link tag={Link} href="/">Home</Nav.Link>
                        <Nav.Link tag={Link} href="/members">Members</Nav.Link>
                        <Nav.Link tag={Link} href="/my-space">My Space</Nav.Link>
                        {!isAuth ?
                            <>
                                <Nav.Link tag={Link} href="/register">
                                    Register
                                </Nav.Link>
                                <Nav.Link tag={Link} href="/login" onClick={login}>
                                    Login
                                </Nav.Link>
                            </>
                            :
                                <Nav.Link tag={Link} href="/" onClick={logout} >
                                    Logout
                                </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )}
        </AuthConsumer>
    );
}

export default withRouter(Navigation);
