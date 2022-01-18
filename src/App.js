import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom"

import { AuthProvider, useAuth } from './context/AuthContext';
import { DatabaseProvider } from './context/DatabaseContext';

import './App.css';

import Home from './Home';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import AccountVerifiedPage from './AccountVerifiedPage';

import DemoHome from './DemoHome'

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <DatabaseProvider>
            <Switch>
              <ProtectedRoute exact path='/login' component={LoginPage} />
              <ProtectedRoute exact path='/verification' component={AccountVerifiedPage} />
              <ProtectedRoute exact path='/' component={Home} />
              <ProtectedRoute exact path='/demo' component={DemoHome} />
              <ProtectedRoute exact path='/admin' component={AdminPage} />
              {/* <ProtectedRoute exact path='/test' component={TestFeature} /> */}
              {/* <Route path="/*" component={WrongURL} />  */}
            </Switch>
          </DatabaseProvider>
        </AuthProvider>
      </Router>

      
    </div>
  );
}


function ProtectedRoute(props) {
  
  const  { currentUser } = useAuth()
  const { path } = props
  // console.log('path', path)
  const location = useLocation()
  // console.log('location state', location.state)

  if (path === '/login' || 
      path === '/signup' ||
    path === '/forgot-password' || path === '/verification') {
      // console.log(currentUser);
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }

  if(path === '/admin') {
    // console.log(process.env.REACT_APP_ADMIN_MAIL_ID);
    if(currentUser.email === process.env.REACT_APP_ADMIN_MAIL_ID) {
      return <Route {...props} />
    } else {
      return <Redirect
      to={{
        pathname: '/'
      }} />
    }
  }

  return currentUser 
  ? (
  <Route {...props} />
  ) 
  : (
  <Redirect
    to={{
      pathname: '/login',
      state: { from: path}
    }}
/> )
}


export default App;
