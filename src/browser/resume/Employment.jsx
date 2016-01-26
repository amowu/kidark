import styles from './resume.scss'

import React, { PropTypes } from 'react'
import { Image } from 'react-bootstrap'
import Component from 'react-pure-render/component'

export default class Employment extends Component {
  static propTypes = {
    employment: PropTypes.object
  };
  render () {
    const {
      employment: {
        history
      }
    } = this.props
    return (
      <div>
        <h5 className={styles['background-heading']}>Experience</h5>
        {history.map((item, index) => {
          const {
            employer,
            end,
            position,
            start,
            summary,
            url
          } = item
          return (
            <div className='media' key={index}>
              <div className={'media-left ' + styles['background-media-left']}>
                <Image src='https://upload.wikimedia.org/wikipedia/zh/7/7f/Gamania_Logo.png' />
              </div>
              <div className={'media-body ' + styles['background-media-body']}>
                <p className={styles['background-media-body-heading']}>{employer}</p>
                <p>{url}</p>
                <p>{position}</p>
                <p>{start} – {end} (? years ? months)</p>
                <p>{summary}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
