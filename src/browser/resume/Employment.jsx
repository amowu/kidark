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
        <h5>
          <i className='fa fa-briefcase'></i> Experience
        </h5>
        {history.map((item, index) => {
          const {
            employer,
            end,
            image,
            position,
            start
          } = item
          return (
            <div className='media' key={index}>
              <div className={'media-left'}>
                <Image src={image} />
              </div>
              <div className={'media-body'}>
                <p>{employer}</p>
                <p>{position}</p>
                <p>{start} – {end}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
