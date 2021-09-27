import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends Component {
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title> info</Card.Title>
                        <Card.Text>
                            <p>{this.props.WeatherApiResult.date}</p>
                            <p>{this.props.WeatherApiResult.description}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default Weather