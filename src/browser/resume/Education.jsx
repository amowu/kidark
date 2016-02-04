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
        <h5>
          <i className='fa fa-graduation-cap'></i> Education
        </h5>
        {history.map((item, index) => {
          const {
            end,
            institution,
            image,
            start,
            title
          } = item
          return (
            <div className='media' key={index}>
              <div className={'media-left'}>
                <Image src={image} />
              </div>
              <div className={'media-body'}>
                <p>{institution}</p>
                <p>{title}</p>
                <p>{start} – {end}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
