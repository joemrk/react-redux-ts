import React from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux';




export const withAuthRedirect = (Component) => {
  
  let returnedComponent = (props) => {
    if (!props.isAuth) return <Redirect to={'/auth'} />
    return <Component {...props} />
  }

  return connect(state => ({isAuth: state.auth.isAuth}))(returnedComponent)
} 