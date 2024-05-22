// Imports
import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, Outlet, useLocation, BrowserRouter as Router } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';

// Components
import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Welcome from './components/Welcome';

// const PrivateRoute = ({ element: element, ...rest}) => {
//   let token = localStorage.getItem('jwtToken');
//   console.log('===> Hitting a Private Route');
//   return <Route {...rest} render={(props) => {
//     return token ? <Outlet {...rest} {...props} element={/> : <Navigate to="/login"/>
//   }} />
// }

const PrivateRoute = ({element: element, ...rest}) => {
  const { pathname } = useLocation();

  const [isValidToken, setIsValidToken] = useState(); // <-- initially undefined
  let token = localStorage.getItem('jwtToken');
  useEffect(() => {
    // initial mount or route changed, check token
    setIsValidToken(!!token);
  }, [pathname]);

  if (isValidToken === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return isValidToken ? <Outlet /> : <Navigate to="/login"/>
}

function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

 
  useEffect(() => {
    let token;

    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
      console.log('====> Authenticated is now FALSE');
      console.log('change the app')
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.getItem('jwtToken'));
      setCurrentUser(token);
    }
  }, []);

  const nowCurrentUser = (userData) => {
    console.log('===> nowCurrent is here.');
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      // remove token for localStorage
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  return (
    <Router>
    <div className="App">
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Routes>
          <Route path='/signup' element={<Signup/>} />
          <Route 
            path="/login"
            element={<Login nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}/>
          {/* <PrivateRoute path="/profile" element={<Profile />} user={currentUser} handleLogout={handleLogout} /> */}
          <Route exact path='/profile' element={<PrivateRoute/>}>
              <Route exact path='/profile' element={<Profile user={currentUser} handleLogout={handleLogout}/>}/>
          </Route>
          <Route exact="true" path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;