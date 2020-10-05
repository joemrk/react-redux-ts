import React, { useEffect } from 'react';
import './styles/app.css';
import NavbarContainer from './Components/Navbar';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './Components/Common/Preloader/Preloader';
import { initApp } from './redux/appReducer'
import { withSuspense } from './hoc/withSuspense';

const MessagesPage = React.lazy(() => import('./Components/Messages'));
const UsersPage = React.lazy(() => import('./Components/Users'));
const AuthorizationPage = React.lazy(() => import('./Components/Authorization'));
const ProfilePage = React.lazy(() => import('./Components/Profile'));


//https://social-network.samuraijs.com/account
//liroyjankins6@gmail.com
//joe

let App = ({ initAppStatus, initApp }) => {

  let globalErrorHandler = (errors) => {
    console.log(errors);
  }
  useEffect(() => {
    initApp()
    window.addEventListener('unhandledrejections', globalErrorHandler)
    return () => {
      window.removeEventListener('unhandledrejections', globalErrorHandler)

    }
  }, [initApp])

  if (!initAppStatus) return <Preloader />

  return (
    <div className="container">
      <NavbarContainer />
      <div className="page-content">
        <Switch>
          <Route exact path="/">
            <Redirect to="/profile" />
          </Route>
          <Route path="/messages" render={withSuspense(MessagesPage)} />
          <Route path="/profile/:profileId?" render={withSuspense(ProfilePage)} />
          <Route path="/users" render={withSuspense(UsersPage)} />
          <Route path="/auth" render={withSuspense(AuthorizationPage)} />
          <Route path="*" render={() => <div>404 NOT FOUND</div>} />
        </Switch>
      </div>
    </div>

  )
}

let mapStateToProps = (state) => ({
  initAppStatus: state.app.initialized,
  auth: state.auth
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initApp }))(App)
