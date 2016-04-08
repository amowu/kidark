
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

    // 檢查 state.auth (persists from localStorage) 是否存在
    // 如果存在，檢查 token 是否過期
    // 如果 token 沒過期，則使用 token 登入，反之則清空  state.auth
    // const { auth } = this.props
    //
    // if (auth) {
    //   const { expires } = auth
    //   const now = Math.floor(Date.now() / 1000)
    //   const tokenIsExpired = (now >= expires)
    //
    //   if (!tokenIsExpired) {
    //     const {
    //       actions: {
    //         auth: {
    //           authWithCustomToken: authWithCustomTokenDispatcher
    //         }
    //       },
    //       auth: {
    //         token
    //       }
    //     } = this.props
    //
    //     authWithCustomTokenDispatcher(token)
    //   } else {
    //     const {
    //       actions: {
    //         auth: {
    //           cleanAuth: cleanAuthDispatcher
    //         }
    //       }
    //     } = this.props
    //
    //     cleanAuthDispatcher()
    //   }
    // }
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
