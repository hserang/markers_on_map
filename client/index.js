'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import WorldMap from './components/WorldMap'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>Some Info Here</h1>
      </header>
    )
  }
}

class AppContainer extends React.Component {
  render() {
    return (
      <div className="appWrapper">
        <Header/>
        <WorldMap/>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<AppContainer/>, document.getElementById('app'))
})
