import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

class MoviesInfo extends Component {
    render() {
        return (
            <div>
              
                            <p>Title: {this.props.MovieApiResult.title}</p>
                            <p>Overview: {this.props.MovieApiResult.overview}</p>
                            <p>Average Votes: {this.props.MovieApiResult.average_votes}</p>
                            <p>Total Votes: {this.props.MovieApiResult.total_votes}</p>
                            <img src={this.props.MovieApiResult.image_url} alt={this.props.MovieApiResult.title}  style={{ width: '100%' }}/>
                            <p>Popularity: {this.props.MovieApiResult.popularity}</p>
                            <p>Released On: {this.props.MovieApiResult.released_on}</p>
                   
            </div>
        )
    }
}
export default MoviesInfo