import React, { Component } from "react";
import * as $ from "jquery";
import {Card} from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup'
import './body.css'; 


export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = "b2c73821ad944bbe875520ceb8db13e3";
let Playlists = [];
let genre = "";
class Spotify extends Component { //Component = function Spotify(props){..}
  constructor(props) {
    super();
    genre = props.genre;
    this.state = {
      token: null,
      item: [],
      no_data: false,
    };

    this.getPlaylists = this.getPlaylists.bind(this);
    //this.tick = this.tick.bind(this);
  }

  componentDidMount() {

    const hash1 = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      },{});
    window.location.hash = "";
    //Valid access token
    let _token = hash1.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getPlaylists(_token); //First call for authorization
    }

  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }


  getPlaylists(token) {
    // Make a call using the token
    $.ajax({
      url: "	https://api.spotify.com/v1/browse/categories/"+genre+"/playlists?offset=0&limit=4",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          item: data.playlists.items,
          no_data: false,
        });
        for (var i = 0; i < this.state.item.length; i++) {
          Playlists.push(this.state.item[i]);
        }
      }
    });
  }

  render() {
    return (
      <React.Fragment>
      <div>
        <header>
          {!this.state.token && (
            <h2>You need to login in order to retrieve music data.</h2>
          )}
        </header>
        </div>
        {this.state.token && (
            <h2>Searched Genre: {this.state.genre}</h2>
          )}
        
        <CardGroup>
          {this.state.item.map((x,index) =>(
            <div className="Card" key={index}>            
            <Card border="info" style={{ width: '16rem' }}>
              <Card.Img className="image-size" variant="top" src={x.images[0].url} ></Card.Img>
              <Card.Body>
                <Card.Title>{x.name}</Card.Title>
                <Card.Text>
                  {x.description}
                  <br/>Number of tracks: 
                {x.tracks.total}
                </Card.Text>
              </Card.Body>
              <Card.Link href={x.external_urls.spotify} target="_blank" variant="success">Link to playlist</Card.Link>
              </Card>
          </div>     
            )
          )}
    </CardGroup>

      </React.Fragment>
);
}
}

export default Spotify;

