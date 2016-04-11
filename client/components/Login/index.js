
import React, { Component } from 'react'

class Login extends Component {
  handleLoginSubmit () {
    this.props.authWithPassword({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <div>
          <h2>Auth With Password</h2>
          <button onClick={::this.handleLoginSubmit}>submit</button>
        </div>
      </div>
    )
  }
}

export default Login
