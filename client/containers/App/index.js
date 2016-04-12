
// import style from './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import { AuthActions, TodoActions } from '../../actions'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'

/**
 * App container component
 * @extends React.Component
 */
class App extends Component {
  componentDidMount () {
    const {
      getAuth,
      onAuth
    } = this.props.actions.auth

    // App 一開始先註冊 Firebase 的 onAuth 事件
    // 當使用者登入，會 dispatch getAuth 的 action creator 來取得資料
    onAuth(getAuth)
  }

  /**
   * 處理登入按鈕的點擊事件
   * @param {MouseEvent} event
   */
  handleLogoutClick (event) {
    this.props.actions.auth.unauth()
  }

  /**
   * 渲染登入之後的元件
   * @return {React.element}
   */
  renderAuth () {
    const { auth } = this.props

    return (
      <div>
        <p>Your UID: {auth.uid}</p>
        <button onClick={::this.handleLogoutClick}>Logout</button>
      </div>
    )
  }

  /**
   * 渲染登入之前的元件
   * @return {React.element}
   */
  renderLogin () {
    return (
      <div>
        <Link to='/login'>Login</Link>
      </div>
    )
  }

  render () {
    const { auth, children } = this.props

    return (
      <div>
        <h1>Home</h1>
        { auth ? this.renderAuth() : this.renderLogin() }
        { children }
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
