import React, { useState } from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect, 
  useLocation,
  useHistory 
} from "react-router-dom";
import Home from "./Home";
import Register from "./register/Register";
// import { Login } from "./login/Login";
import MySpace from "./myspace/MySpace";
import { Navbar, Nav } from "react-bootstrap";

const authUser = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

function Login() {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const { state } = useLocation()

  const login = () => 
    authUser.authenticate(() => {
      setRedirectToReferrer(true)
    })

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }
  
return (
    <div>
      <p>You must log in to view the page</p>
      <button onClick={login}>Log in</button>
    </div>
  )
  
}
    
function PrivateRoute ({ children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => {
      return authUser.isAuthenticated === true
        ? children
        : <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
    }} />
  )
}

function AuthButton () {
  const history = useHistory()

  return authUser.isAuthenticated === true
    ? 
    <div>
        <p>
            Welcome! <button onClick={() => {
            authUser.signout(() => history.push('/'))
            }}>Sign out</button>
        </p>
    </div>
    : 
    <div><p>You are not logged in.</p></div>
}

export default (
  <Router>
    <div>
      
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/programs">Programs</Nav.Link>
              <Nav.Link href="/organizations">Organizations</Nav.Link>
              <Nav.Link href="/members">Members</Nav.Link>
              <Nav.Link href="/my-space">My Space</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <AuthButton />
      <Switch>
      <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/my-space" component={MySpace} />
      </Switch>
    </div>
  </Router>
);
