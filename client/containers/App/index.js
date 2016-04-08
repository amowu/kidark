
// import style from './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { AuthActions, TodoActions } from '../../actions'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'

class App extends Component {
  componentDidMount () {
    const {
      actions: {
        auth: {
          getAuth,
          onAuth
        }
      }
    } = this.props

    // App 一開始先註冊 Firebase 的 onAuth 事件
    // 當使用者登入，會 dispatch getAuth 的 action creator 來取得資料
    onAuth(getAuth)
  }

  handleLogoutClick (event) {
    event.preventDefault()

    const {
      actions: {
        auth: {
          unauth
        }
      }
    } = this.props

    // logout Firebase
    unauth()
  }

  handleLoginClick (event) {
    event.preventDefault()

    const {
      actions: {
        auth: {
          authWithPassword
        }
      }
    } = this.props

    authWithPassword({
      email: 'zzz@zzz.zzz',
      password: 'abc123'
    })
  }

  handleSignUpClick (event) {
    event.preventDefault()

    const {
      actions: {
        auth: {
          createUserAndAuthWithPassword
        }
      }
    } = this.props

    createUserAndAuthWithPassword({
      email: 'yyy2232@yyy.yyy',
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
              <h2>Create User</h2>
              <button onClick={::this.handleSignUpClick}>submit</button>
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
