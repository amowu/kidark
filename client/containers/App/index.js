
// import style from './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
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
    this.props.actions.auth.unauth()
  }

  render () {
    console.log('App: render')

    const { auth, children } = this.props

    // TODO: 建立 Login container
    return (
      <div>
        <h1>Home</h1>
          {
            auth ?
              <div>
                <p>Your UID: {auth.uid}</p>
                <button onClick={::this.handleLogoutClick}>logout</button>
              </div>
            :
              <div>
                <Link to="/login">Login</Link>
              </div>
          }
        {children}
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
