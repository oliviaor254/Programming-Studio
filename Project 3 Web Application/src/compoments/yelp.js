import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {Card} from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup'
import './body.css'; 


function Yelp(props){
// state varibles that check if there is data and to store the data
  const[yelpData, setYelpData] = useState('');
  const[ready, setReady] = useState(false);
// useEffect gets called after the inital render
useEffect(()=>{
  let API_KEY = "RxgyCjm6cjS3JIuKRdnHoqSFYPp0NEMIBAvmRFDuRm_fZyeQsDQHvT0LHMc7n8KcwEcqnAMqmonS0epWSvspO9O0pOa6Y84uNXoXqbPsJkyYw7Msni9zfxtiN1iOX3Yx";
  // REST
  let yelpREST = axios.create({
    baseURL: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/",
    headers: {
      Authorization: `Bearer ${API_KEY}` ,
      "Content-type": "application/json",
    },
  })
  yelpREST("/businesses/search", {
      params: {
        location: props.data,
        term: "Grocery",
        limit: 4,
      },
    }).then(({ data }) => {
      let { businesses } = data
      businesses.forEach((b) => {
        console.log("Name: ", b.name);
        console.log("Address: ", b.location.address1);;
        console.log("\n")
      })
      if(Object.entries(businesses).length !== 0){
        console.log("Hello");
        setYelpData(businesses);
        setReady(true);
      }
    }).catch((err)=>{
      console.log(err.message);
    });
 },[props.data]); // [props.data] is input to the useEffect function
 // Map the data state varible to get each store and output data at named JSON key 
 // All that needs to be done is html/css inside the div and css
return(
    <React.Fragment>
        <h2>Searched city {props.data}</h2>
        <CardGroup>
        {!ready ? <h2 className="center">No reviewed stores for input location</h2>:
          yelpData.map((x,index) => 
          <div className="Card" key={index}>            
            <Card border="info" style={{ width: '16rem' }}>
              <Card.Img className="image-size" variant="top" src={x.image_url} ></Card.Img>
              <Card.Body>
                <Card.Title>{x.name}</Card.Title>
                <Card.Text>
                <p>
                  Address: {x.location.address1} 
                  <br></br>
                  Rating: {x.rating}/5
                </p>
                </Card.Text>
              </Card.Body>
              <Card.Link href={x.url} target="_blank">Website</Card.Link>
              </Card>
          </div>
          )
        }
        </CardGroup>
    </React.Fragment>
  )
}
export default Yelp;