
import React, { Component } from 'react'

class SignUp extends Component {
  handleClick (event) {
    event.preventDefault()

    this.props.actions.auth.signUp({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  // TODO: 暫時，之後移除
  handelLoginClick (event) {
    event.preventDefault()

    this.props.actions.auth.login({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  render () {
    return (
      <div>
        <h1>SignUp</h1>
        <button onClick={::this.handleClick}>submit</button>
        <h1>Login</h1>
        <button onClick={::this.handelLoginClick}>submit</button>
      </div>
    )
  }
}

export default SignUp
