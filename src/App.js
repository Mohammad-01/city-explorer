import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup'
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    searchq:'', 
    locationResult: {},
    detLocation: false,   
    error: false
    
  }}

  ///for Location
  Location = async (event) => {
    event.preventDefault();
    await this.setState({
    searchq: event.target.cityname.value
    })

    console.log('key', process.env.REACT_APP_LOCATIONIQ_KEY);

    try {

      let url = `https://us1.locationiq.com/v1/search.php?key=pk.2d70985c19d44dbaa8b82b87a27a4c95&q=${this.state.searchq}&format=json`;
      let locationData = await axios.get(url);

      this.setState({
        locationResult: locationData.data[0],
        error:false,
        detLocation: true

      })

    } 
    
    catch {
      this.setState({
        detLocation:false,
        error: true

      })
    }

 ///for weather
 
  }

  render() {
    return (

        <div>

          <form onSubmit={this.Location} >
            <input type="text" name='cityname' />
            <input type="submit" value='city info' />
          </form>

          <Card style={{ width: '30rem' }}>
          <Card.Img variant="top" 
           src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`} alt="city" 
 />

              <Card.Body>
              
              <Card.Title>City explorer</Card.Title>
     
                   
              <ListGroup variant="flush">
                <ListGroup.Item> Name: {this.state.searchq}</ListGroup.Item>
                <ListGroup.Item> Longitude: {this.state.locationResult.lon} </ListGroup.Item>
                <ListGroup.Item>Latitude: {this.state.locationResult.lat}</ListGroup.Item>
               </ListGroup>


           </Card.Body>

          </Card>

                </div>
              )
            }
          }

export default App;