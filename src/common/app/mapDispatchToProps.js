import {Map} from 'immutable'
import {bindActionCreators} from 'redux'

const actions = [
]

export default function mapDispatchToProps (dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  }
}
