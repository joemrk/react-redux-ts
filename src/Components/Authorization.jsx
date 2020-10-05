import React from 'react'
import '../styles/auth.css'
import { Field, reduxForm } from 'redux-form'
import { required, minLength } from '../Utils/Validators'
import TextInput from './Common/Forms/TextInput'
import { connect } from 'react-redux'
import { Login } from '../redux/authReducer';
import { Redirect } from 'react-router-dom';

let Authorization = ({ Login, isAuth, id, captchaUrl }) => {
  let formSubmit = (data) => {
    Login(data.login, data.password, data.remember, data.captcha)
  }
  if (isAuth)
    // return <Redirect to={`/profile/${id}`}></Redirect>
    return <Redirect to={`/`}></Redirect>
  else return (
    <div className="page-block">
      <div className="login-form-wrap">
        <h1>Login</h1>
        <LoginForm onSubmit={formSubmit} captchaUrl={captchaUrl}/>
      </div>
    </div>
  )
}


const createFormInput = (component, validate, defaultInputProps, text) => {
  return (
    <div className="form-group">
      <Field component={component} {...defaultInputProps} validate={validate} />{` ${text}`}
    </div>
  )
}

const minLength3 = minLength(3)
let LoginFormComponent = ({ handleSubmit, error , captchaUrl}) => {
  console.log(captchaUrl);
  return (
    <form onSubmit={handleSubmit}>
      {createFormInput(TextInput, [required, minLength3], { placeholder: "login", name: "login" }, '')}
      {createFormInput(TextInput, [required, minLength3], { placeholder: "Password", name: "password" }, '')}
      {createFormInput("input", [], { type: "checkbox", name: "remember" }, 'remember me')}

      {captchaUrl && <div>
        <img src={captchaUrl} />
        {createFormInput(TextInput, [required], { placeholder: "Captcha symbols", name: "captcha" }, '')}
      </div>
      }

      <div className="form-group">
        {error && <div className="errors">
          {error}
        </div>}
      </div>
      <div className="form-group">
        <div className="form-submit btn">
          <button>Sign in</button>
        </div>
      </div>
    </form>
  )
}

let LoginForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(LoginFormComponent)
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  id: state.auth.id,
  captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, { Login })(React.memo(Authorization))