
import React, { Component } from 'react'

class SignUp extends Component {
  handleClick (event) {
    event.preventDefault()

    this.props.actions.auth.createUser({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  render () {
    return (
      <div>
        <h1>SignUp</h1>
        <button onClick={::this.handleClick}>submit</button>
      </div>
    )
  }
}

export default SignUp
