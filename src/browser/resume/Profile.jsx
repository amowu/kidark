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
      <div className='media'>
        <div className='media-left'>
          <Image src={image} />
        </div>
        <div className='media-body'>
          <h1>{name}</h1>
          <p>{label}</p>
          <div>
            <i className='fa fa-envelope-o'></i>
            <a href={'mailto:' + email}> {email}</a>
          </div>
          <div>
            <i className='fa fa-link'></i>
            <a href={website}> {website}</a>
          </div>
          <div>
            <i className='fa fa-map-marker'></i>
            <span> {city}, {country}</span>
          </div>
          <div>
            {social.map((item, index) =>
              <a href={item['url']} key={index}><i className={'fa ' + item['fa'] + ' fa-3x'}></i> </a>
            )}
          </div>
        </div>
      </div>
    )
  }
}
