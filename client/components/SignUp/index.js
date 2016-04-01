
import React, { Component } from 'react'

class SignUp extends Component {
  handleClick (e) {
    e.preventDefault()

    this.props.actions.auth.signUp({
      email: 'xxx@xxx.xxx',
      password: 'abc123'
    })
  }

  render () {
    return (
      <div>
        <h1>Sign Up</h1>
        <button onClick={::this.handleClick}>submit</button>
      </div>
    )
  }
}

export default SignUp
