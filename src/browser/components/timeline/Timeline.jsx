import styles from './timeline.scss'

import classNames from 'classnames'
import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

class TimelineItem extends Component {
  static propTypes = {
    color: PropTypes.string,
    last: PropTypes.bool,
    pending: PropTypes.bool
  };
  static defaultProps = {
    color: 'blue',
    last: false,
    pending: false
  };
  render () {
    const {
      children,
      color,
      last,
      pending
    } = this.props
    const itemClassName = classNames({
      [styles['item']]: true,
      [styles['item-last']]: last,
      [styles['item-pending']]: pending
    })
    return (
      <li className={itemClassName}>
        <div className={styles['item-tail']} />
        <div className={styles['item-head'] + ' ' + styles['item-head-' + color]} />
        <div className={styles['item-content']}>{children}</div>
      </li>
    )
  }
}

class Timeline extends Component {
  static Item = TimelineItem;
  render () {
    const {
      children,
      pending
    } = this.props
    const pendingNode = typeof pending === 'boolean' ? null : pending
    const className = classNames({
      [styles['pending']]: !!pending
    })
    return (
      <ul className={className}>
        {
          React.Children.map(children, (ele, idx) =>
            React.cloneElement(ele, {
              last: idx === children.length - 1
            })
          )
        }
        {(pending)
          ? <TimelineItem pending={!!pending}>{pendingNode}</TimelineItem>
          : null}
      </ul>
    )
  }
}

export default Timeline
