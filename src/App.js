import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Weather from './component/Weather';
import MoviesInfo from './component/MoviesInfo'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      locationResult: {},
      detLocation: false,
      error: false,
      showWeatherInfo: false,
      WeatherApiResult: [],
      MovieApiResult: []

    }
  }
  ///for Location
  Location = async (event) => {
    event.preventDefault();
    await this.setState({
      search: event.target.city.value
    })


    try {

      let reqUrlLoction = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.search}&format=json`;
      let locationData = await axios.get(reqUrlLoction);
      this.setState({
        locationResult: locationData.data[0],
        error: false,
        detLocation: true

      })

    } catch {
      this.setState({
        detLocation: false,
        error: true

      })
    }

    try {
      let reqUrlMovie = `https://weather300d1.herokuapp.com/getapimovies?city=${this.state.search}`;

      let moviedata = await axios.get(reqUrlMovie);

      this.setState({
        MovieApiResult: moviedata.data,
        showLocInfo: true,
        showerror: false
      })

    } catch {

      this.setState({
        showerror: true,
        showLocInfo: false
      })
    }
    try {
      let reqUrlWeather = `https://weather300d1.herokuapp.com/getapiweather?city=${this.state.search}`;

      let weatherdata = await axios.get(reqUrlWeather);
      this.setState({
        WeatherApiResult: weatherdata.data,
        showWeatherInfo: true,
        showerror: false
      })

    } catch {
      this.setState({
        showerror: true,
        showWeatherInfo: false
      })
    }

  }




  render() {
    return (

      <div>

        <form onSubmit={this.Location} >
          <input type="text" name='city' />
          <input type="submit" value='Search' />
        </form>

        <Card style={{ width: '30rem' }}>
          <Card.Img variant="top"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city"
          />

          <Card.Body>

            <Card.Title>City explorer</Card.Title>


            <ListGroup variant="list-group-flush">
              <ListGroup.Item> Name: {this.state.search}</ListGroup.Item>
              <ListGroup.Item> Longitude: {this.state.locationResult.lon} </ListGroup.Item>
              <ListGroup.Item>Latitude: {this.state.locationResult.lat}</ListGroup.Item>
              <ListGroup.Item>

                {this.state.WeatherApiResult.map(ele => {
                  return (
                    <Weather WeatherApiResult={ele} />
                  )
                })}
              </ListGroup.Item>


              <ListGroup.Item>
                {this.state.MovieApiResult.map(ele => {
                  return (
                    <MoviesInfo MovieApiResult={ele} />
                  )
                })}
              </ListGroup.Item>
            </ListGroup>



          </Card.Body>

        </Card>

      </div>
    )
  }
}

export default App;