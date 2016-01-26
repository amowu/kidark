import styles from './resume.scss'

import React, { PropTypes } from 'react'
import { Image } from 'react-bootstrap'
import Component from 'react-pure-render/component'

export default class Education extends Component {
  static propTypes = {
    education: PropTypes.object
  };
  render () {
    const {
      education: {
        history
      }
    } = this.props
    return (
      <div>
        <h5 className={styles['background-heading']}>Education</h5>
        {history.map((item, index) => {
          const {
            end,
            institution,
            start,
            title
          } = item
          return (
            <div className='media' key={index}>
              <div className={'media-left ' + styles['background-media-left']}>
                <Image src='https://media.licdn.com/mpr/mpr/shrink_200_200/p/6/005/0a5/02d/015e2ec.png' />
              </div>
              <div className={'media-body ' + styles['background-media-body']}>
                <p className={styles['background-media-body-heading']}>{institution}</p>
                <p className={styles['background-media-body-subheading']}>{title}</p>
                <p>{start} – {end}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
