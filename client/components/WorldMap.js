const openSocket = require('socket.io-client')
const socket = openSocket('http://localhost:8000')

const React = require('react')
const {Component} = require('react')
const {feature} = require('topojson-client')
const {
  geoMercator,
  geoPath
} = require('d3-geo')

// todo: set the interval on the server perhaps?
function subscribeToTimer(cb) {
  socket.on('data', servers => {
    return cb(null, servers)
  })

  socket.emit('subscribeToTimer', 1000)
}

class WorldMap extends Component {
  constructor() {
    super()

    this.state = {
      worldData: [],
      servers: [ ]
    }

    subscribeToTimer((err, servers) => this.setState({servers}))

    this.handleCountryClick = this.handleCountryClick.bind(this)
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  handleCountryClick(countryIndex) {
    console.log('clicked on country', countryIndex)
  }

  handleMarkerClick(markerIndex) {
    console.log('clicked on marker', markerIndex)
  }

  projection() {
    return geoMercator()
    .scale(100)
    .translate([800/2, 450/2])
  }

  componentDidMount() {
    const mapJson = 'world-110m.json'

    fetch('/world-110m.json')
    .then(response => {
      if (response.status != 200) {
        console.log('error fetching', mapJson)

        return false
      }

      response.json()
      .then(worldData => {
        this.setState({
          worldData: feature(
            worldData,
            worldData.objects.countries
          ).features
        })
      })
    })
  }

  render() {
    return (
      <div>
      <svg viewBox="0 0 800 450">
        <g className="countries">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={'path-' + i}
                d={geoPath().projection(this.projection())(d)}
                className='country'
                fill={`rgba(38, 50, 56, ${1/this.state.worldData.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={0.5}
                onClick={() => this.handleCountryClick(i)}
              />
            ))
          }
        </g>
        <g className="markers">
          {
            this.state.servers.map((server, i) => (
              <circle
                key={'marker-' + i}
                cx={this.projection()(server.coordinates)[0]}
                cy={this.projection()(server.coordinates)[1]}
                r={server.population/3000000}
                fill="#43bded"
                stroke="#FFFFFF"
                className="marker"
                onClick={() => this.handleMarkerClick(i)}
              />
            ))
          }
        </g>
      </svg>
      </div>
    )
  }
}

export default WorldMap
