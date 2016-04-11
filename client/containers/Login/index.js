
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AuthActions } from '../../actions'

/**
 * Login component
 * @extends react.Component
 */
class Login extends Component {
  constructor(props, context) {
    super(props, context)
  }

  handleSubmit (event) {
    event.preventDefault()

    const {
      actions: {
        authWithPassword
      }
    } = this.props

    authWithPassword({
      email: this.refs.email.value,
      password: this.refs.password.value
    })
  }

  render () {
    console.log('Login:render')

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={::this.handleSubmit}>
          <input type='text' ref='email' />
          <input type='password' ref='password' />
          <button onClick={::this.handleSubmit}>submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
