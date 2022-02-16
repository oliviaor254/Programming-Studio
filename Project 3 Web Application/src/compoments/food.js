import React from 'react';
import { useState } from 'react';
import {Card} from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup'
import './body.css'; 
import Recipe from './recipe';


/**
 * Function I got off the internet to make Unique IDs for the list elements in the return statement.
 * Credit: https://www.tutorialspoint.com/how-to-create-guid-uuid-in-javascript by Ayush Gupta
 * @returns pseudo-random UUID. WARNING: miniscule chance of repeating values
 */
function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = (c === 'x') ? r : ( (r & 0x3) | (0x8) );
       return v.toString(16);
    });
}

 /**
  * Function called from the body that queries the API for the specified ingredients
  * @param {meat, veg, carb} props
  * @returns HTML of the query results to be put on the webpage
  */
function Food(props){
    const [globalJson, setglobalJson] = useState([]);
    React.useEffect( () => {
        let query = "https://api.spoonacular.com/recipes/findByIngredients/?apiKey=e63d748942b44a7d9562580c47476313&ranking=1&ignorePantry=false&";
        let amnt = 4; // how many recipes do we want to return
        query += "number=" + amnt + "&ingredients=";

        //putting in the ingredients
        if(props.meat !== "None"){
            query += props.meat + ",+"
        }
        else if(props.veg !== "None"){
            query += props.veg;
        }
        else if(props.carb !== "None"){
            query += ",+" + props.carb;
        }

        //test query string
        console.log("\nSent this request to Spoonacular:\n" + query);
        fetch(query)
        //receive html response of server
        .then(response => {
            if(!response.ok){
                throw new Error("Network response failed!");
            }
            return response.json();
        })
        .then( myJson => {
            setglobalJson(myJson);
            console.log(myJson);
        })
        .catch(error => {
            console.error("Spoonacular fetch operation ERROR: ",error);
        });

    }, [props])

    return(
        <React.Fragment>
            <h2>Results with {props.meat}, {props.veg}, &amp; {props.carb}:</h2>
            <CardGroup>
            {globalJson.map((recipe,index) =>(
                <div key={createUUID()} className="Card">
                        <Card border="info" style={{ width: '16rem'}}>
                            <Card.Img className="image-size" variant="top" src={recipe.image}></Card.Img>
                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                            </Card.Body>
                            <Recipe id={recipe.id} index={index}/>
                        </Card>
                </div>
            ))}
            </CardGroup>
            
        </React.Fragment>
    )
}
export default Food;
