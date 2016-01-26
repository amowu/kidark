import styles from './resume.scss'

import React, { PropTypes } from 'react'
import { Image } from 'react-bootstrap'
import Component from 'react-pure-render/component'

export default class Profile extends Component {
  static propTypes = {
    contact: PropTypes.object,
    info: PropTypes.object,
    location: PropTypes.object,
    name: PropTypes.string,
    social: PropTypes.array
  };
  render () {
    const {
      contact: {
        email,
        website
      },
      info: {
        brief,
        characterClass,
        image,
        label
      },
      location: {
        city,
        country
      },
      name,
      social
    } = this.props
    return (
      <div className={'media ' + styles['profile-media']}>
        <div className='media-left'>
          <Image src={image} />
        </div>
        <div className={'media-body ' + styles['profile-media-body']}>
          <p className={styles['formatted-name']}>{name}</p>
          <p className={styles['headline']}>{characterClass} {label}</p>
          <p>{brief}</p>
          <p>{email}</p>
          <p>{website}</p>
          <address className={styles['location']}>
            <span className='fa fa-map-marker' aria-hidden='true'></span>
            <span className='sr-only'>Location:</span>
            {city}, {country}
          </address>
          <ul>
            {social.map((item, index) =>
              <li key={index}>{item['url']}</li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
