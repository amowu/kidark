
import React, { Component } from 'react'

class Login extends Component {
  handleClick (event) {
    event.preventDefault()

    this.props.actions.auth.login({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <button onClick={::this.handleClick}>submit</button>
      </div>
    )
  }
}

export default Login
