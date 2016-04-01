
import style from './style.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AuthActions from '../../actions/auth'
import * as TodoActions from '../../actions/todos'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'

class App extends Component {
  render () {
    const { todos, actions, children } = this.props
    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children && React.cloneElement(children, this.props)}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
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
