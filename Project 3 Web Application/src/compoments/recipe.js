import React from 'react';
import {useState} from 'react';
import './body.css'; 
import {Card} from "react-bootstrap";

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
function downloadFile(x){
    var y = x.toString();
    var z = (x+20).toString();
    const element = document.createElement("a");
    const element2 = document.createElement("a");
    const file = new Blob([document.getElementById(y).innerText], {type: 'text/plain;charset=utf-8'});
    const file2 = new Blob([document.getElementById(z).innerText], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element2.href = URL.createObjectURL(file2);
    element.download = "Ingredients.txt";
    element2.download = "Recipe.txt";
    document.body.appendChild(element);
    document.body.appendChild(element2);
    element.click();
    element2.click();
   console.log(x);
}


function Recipe(props){
    const [ingrList, setIngrList] = useState()
    const [instrList, setInstrList] = useState()
    const [ready, setReady] = useState(false)
    React.useEffect( () => {
    // Need: list of ingredients, list of instructions <-- string, but lines separated with \n
    let query = "https://api.spoonacular.com/recipes/" + props.id + "/analyzedInstructions/?apiKey=e63d748942b44a7d9562580c47476313"
    fetch(query).then(response => {
        if(!response.ok){
            throw new Error("Network response failed!");
        }
        return response.json();
    })
    .then( myJson => {
        let tempingrList = [];
        let tempinstrList = [];
        console.log(myJson);
        myJson.forEach((bigRep) =>{
            bigRep.steps.forEach((steps) =>{
                // add the ingredients for that step
                steps.ingredients.forEach((ingr) =>{
                    tempingrList.push(ingr.name);
                })
                // Add the actual instruction
                tempinstrList.push(steps.step);
            })
        });
        setIngrList(tempingrList);
        setInstrList(tempinstrList);
        setReady(true);
    })
    .catch(error => {
        console.error("Second Spoonacular fetch operation ERROR: ",error);
    });
   },[props.id]); 

    return(
        <React.Fragment>
            <div className="no-show">
                    <ul id={props.index}>
                        {/* First checks if the query is ready. If it's ready, checks that it is empty or not*/}
                        {ready ? ( ingrList.length===0 ? <p className="noData-recipe">Sorry, Spoonacular API returned no data</p> : ingrList.map( ingredient=>(
                            <li key={createUUID()}>{ingredient}</li>
                        ))):<p>Ingredient Data</p>}
                    </ul>
                    <ul id={props.index + 20}>
                        {ready ?(instrList.length===0 ? <p className="noData-recipe">Sorry, Spoonacular API returned no data</p> : instrList.map( instruction=>(
                            <li key={createUUID()}>{instruction}</li>
                        ))):<p>Step Data</p>}
                    </ul>
            </div> 
            <Card.Link className="food-link" onClick={e => downloadFile(props.index)}>Download Ingredients and Recipe</Card.Link>
        </React.Fragment>
    );
 }
export default Recipe;
