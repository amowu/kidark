
import React, { Component } from 'react'

class Login extends Component {
  componentWillMount () {
    console.log('Login: componentWillMount')
  }

  componentDidMount () {
    console.log('Login: componentDidMount')
  }

  handleClick (event) {
    event.preventDefault()

    this.props.actions.auth.authWithPassword({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  handleClick2 (event) {
    event.preventDefault()

    this.props.actions.auth.authWithCustomToken(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InByb3ZpZGVyIjoicGFzc3dvcmQiLCJ1aWQiOiJhYjdjZmUxZC02NDYzLTQ1ZTUtOTc0YS0zMTFkYzBhNWFmZTYifSwiaWF0IjoxNDYwMDA3OTkxfQ.M_qjwHb6MiwJ5xpoB0ure9DcIZljc3pzC9_PvRBwX_4'
    )
  }

  render () {
    return (
      <div>
        <h1>Login</h1>
        <h2>Auth With Password</h2>
        <button onClick={::this.handleClick}>submit</button>
        <h2>Auth With Custom Token</h2>
        <button onClick={::this.handleClick2}>submit</button>
      </div>
    )
  }
}

export default Login
