
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux'

import { AuthActions } from '../../actions'

/**
 * Login container component
 * @extends react.Component
 */
class Login extends Component {
  constructor (props, context) {
    super(props, context)
  }

  componentWillReceiveProps (nextProps) {
    const {
      auth
    } = nextProps

    // 如果已登入，回首頁
    if (auth) browserHistory.push('/')
  }

  /**
   * 處理登入表單的發送事件
   * @param {MouseEvent}
   */
  handleSubmit (event) {
    event.preventDefault()

    const {
      authWithPassword
    } = this.props.actions.auth

    // 使用信箱＆密碼登入
    authWithPassword({
      email: this.refs.email.value,
      password: this.refs.password.value
    })
  }

  render () {
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
    actions: {
      auth: bindActionCreators(AuthActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
