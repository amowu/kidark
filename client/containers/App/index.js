
// import style from './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AuthActions from '../../actions/auth'
import * as TodoActions from '../../actions/todos'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'

class App extends Component {
  componentWillMount () {
    console.log('App: componentWillMount')
  }

  componentDidMount () {
    console.log('App: componentDidMount')

    // TODO: check token and auth
    this.props.actions.auth.checkAuth()
  }

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

    // return (
    //   <div className={style.normal}>
    //     <Header addTodo={actions.todos.addTodo} />
    //     <MainSection todos={todos} actions={actions.todos} />
    //     {children}
    //   </div>
    // )

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
