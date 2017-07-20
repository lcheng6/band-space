import React from 'react'
import { Field, reduxForm } from 'redux-form'

let ProfileForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <Field
          name="email"
          component="input"
          type="text"
          className="uSignup__left__input"
          placeholder="Email"
        />
        <Field
          name="password"
          component="input"
          type="textarea"
          className="uSignup__left__input"
          placeholder="Password"ç
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

ProfileForm = reduxForm({
  // a unique name for the form
  form: 'profile'
})(ProfileForm)

export default ProfileForm;
