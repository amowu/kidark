import styles from './app.scss'

import React, { PropTypes } from 'react'
import { Col, Grid, Row } from 'react-bootstrap'
import Component from 'react-pure-render/component'
import { connect } from 'react-redux'

import mapStateToProps from '../../common/app/mapStateToProps'
import mapDispatchToProps from '../../common/app/mapDispatchToProps'
import RouterHandler from '../../common/components/RouterHandler.react'
import Dialogue from '../dialogue/Dialogue.jsx'
import Game from '../game/Game.jsx'

class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    dialogues: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };
  render () {
    const {
      actions,
      dialogues,
      history: {
        pushState
      },
      location: {
        pathname
      }
    } = this.props

    return (
      <div data-pathname={pathname}>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className={styles.container}>
                <div className={styles.game}>
                  <Game {...{actions}} />
                </div>
                <div className={styles.dialogue}>
                  <Dialogue {...{actions, dialogues, pushState}} />
                </div>
              </div>
              <RouterHandler {...this.props} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
