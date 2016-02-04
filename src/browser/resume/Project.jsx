import React, { PropTypes } from 'react'
import Component from 'react-pure-render/component'

export default class Project extends Component {
  static propTypes = {
    projects: PropTypes.array
  };
  render () {
    const {
      projects
    } = this.props
    return (
      <div>
        {projects.map((item, index) => {
          const {
            category,
            description,
            end,
            role,
            start,
            summary,
            title,
            url
          } = item
          return (
            <div key={index}>
              <p>{title}</p>
              <p>{url}</p>
              <p>{description}</p>
              <p>{category}</p>
              <p>{start} - {end}</p>
              <p>{role}</p>
              <p>{summary}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
