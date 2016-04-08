
// import style from './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AuthActions, TodoActions } from '../../actions'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'

class App extends Component {
  componentDidMount () {
    console.log('App: componentDidMount')

    // 一開始先註冊 Firebase 的 onAuth 事件
    const {
      actions: {
        auth: {
          getAuth: getAuthDispatcher,
          onAuth: onAuthDispatcher
        }
      }
    } = this.props

    // 當使用者登入，會觸發 getAuth 的 action 來取得資料
    onAuthDispatcher(getAuthDispatcher)
  }

  // TODO: component unMount offAuth

  handleLogoutClick (event) {
    event.preventDefault()

    this.props.actions.auth.unauth()
  }

  handleLoginClick (event) {
    event.preventDefault()

    this.props.actions.auth.authWithPassword({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  render () {
    console.log('App: render')

    const { auth, todos, actions, children } = this.props

    return (
      <div>
        <h1>Home</h1>
        {
          auth ?
            <div>
              <h2>Auth User Data</h2>
              <p>Your UID: {auth.uid}</p>
              <p>Your Token: {auth.token}</p>
              <h2>Logout</h2>
              <button onClick={::this.handleLogoutClick}>submit</button>
            </div>
          :
            <div>
              <h2>Auth With Password</h2>
              <button onClick={::this.handleLoginClick}>submit</button>
            </div>
        }
        {children && React.cloneElement(children, this.props)}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    auth: state.auth,
    todos: state.todos
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      auth: bindActionCreators(AuthActions, dispatch),
      todos: bindActionCreators(TodoActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
