import React from 'react';
import './body.css';
import { useState } from 'react';
import  Yelp from './yelp';
import Food from './food';
import Spotify from './spotify';

function Body() {
    const redirectUri = "https://csce315-project3.web.app/";
    const clientId = "b2c73821ad944bbe875520ceb8db13e3";
    const [city, setCity] = useState("")
    const [meat, setMeat] = useState("")
    const [veg,setVeg] = useState("")
    const [carb, setCarb] = useState("")
    const [genre, setGenre] = useState("")
    const[input,setInput] = useState(0);
    const [ready, setReady] = useState(false);
    const [accesibleMode, setAccess] = useState(false);

    function Reset(){
        document.getElementById("clearCity").value="";
        setCity("")
        document.getElementById("clearMeat").value="";
        setMeat("")
        document.getElementById("clearVeg").value="";
        setVeg("")
        document.getElementById("clearCarb").value="";
        setCarb("")
        document.getElementById("clearGenre").value="";
        setGenre("")
        setReady(false);
        setInput(0);
    }
    function CityIN(target){
        if(city===""){
            setInput(input+1);
        };
        let temp = target.charAt(0).toUpperCase() + target.slice(1);
        console.log(temp);
        setCity(temp);
    }
    function MeatIN(target){
        if(meat===""){
            setInput(input+1);
        }
        setMeat(target);
    }
    function VegIN(target){
        if(veg===""){
            setInput(input+1);
        }
        setVeg(target);
    }
    function CarbIN(target){
        if(carb===""){
            setInput(input+1);
        }
        setCarb(target);
    }
    function GenreIN(target){
        if(genre===""){
            setInput(input+1);
        }
        setGenre(target);
    }
    return(
    <React.Fragment>
        <div className={accesibleMode ? "body-access" : "body"}>
            <button className={accesibleMode ? "access-button-access" : "access-button"} onClick={ () => accesibleMode ? setAccess(false) : setAccess(true)}>Toggle Accessibility</button>
            <div className ={accesibleMode ? "header-container-access" : "header-container"}>
                <h1>Extreme Tailgate Planner</h1>
                <p>This website lets you find the food and music of your choosing for your tailgate while suggesting where you can buy it nearby!
                    If you want to be able to see the music results, login to Spotify before entering anything else!
                </p>
            </div>
            <div className="wrapper">
            <div className={accesibleMode ? "input-container-access" : "input-container"}> 
                <div className = "box">
                     <a target="_blank" rel="noopener noreferrer"
                        href={`https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`}
                     > <button className="button-input">Login To Spotify!</button></a>
                </div>
                <div className = "box">
                    <label className="input-label">Enter City</label><br/>
                    <input type="text" className="input-box" id="clearCity" onChange = {e =>CityIN(e.target.value)}></input>
                </div>
                <div className = "box">
                    <label className= "input-label">Protein Choice</label><br/>
                    <select className="input-box" value = {meat}  id="clearMeat"  onChange= {e => MeatIN(e.target.value)}>
                        <option value="" disabled></option> 
                        <option value="None">None</option>
                        <option value="Chicken">Chicken</option> 
                        <option value="Steak">Steak</option>  
                        <option value="Pork">Pork</option> 
                        <option value="Beef">Beef</option>
                        <option value="Sausage">Sausage</option>
                        <option value="Ribs">Ribs</option>
                        <option value="Tofu">Tofu</option>
                    </select>
                </div>
                <div className = "box">
                    <label className= "input-label">Veggie Choice</label><br/>
                    <select className="input-box" value = {veg}  id="clearVeg" onChange= {e => VegIN(e.target.value)}>
                        <option value="" disabled></option>
                        <option value="None">None</option> 
                        <option value="Corn">Corn</option> 
                        <option value="Potato">Potato</option>  
                        <option value="Salad">Salad</option> 
                        <option value="Green beans">Green beans</option>
                        <option value="Onions">Onions</option>
                    </select>
                </div>
                <div className = "box">
                    <label className= "input-label">Carb Choice</label><br/>
                    <select className="input-box" value = {carb}  id="clearCarb" onChange= {e => CarbIN(e.target.value)}>
                        <option value="" disabled></option>
                        <option value="None">None</option> 
                        <option value="Bread">Bread</option> 
                        <option value="Fries">Fries</option>
                        <option value="Chips">Chips</option>
                        <option value="Tortillas">Tortillas</option>
                    </select>
                </div>
                <div className = "box">
                    <label className="input-label">Spotify Genre</label><br/>
                    <select className="input-box" value = {genre}  id="clearGenre" onChange= {e => GenreIN(e.target.value)}>
                        <option value="" disabled></option> 
                        <option value="sports">Sport</option>
                        <option value="inspirational">Christian</option>
                        <option value="country">Country</option>
                        <option value="hiphop">Hip Hop</option>
                        <option value="latin">Latin</option>                    
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>   
                    </select>
                </div>
                <div className = "box">
                    {input>=5 ? <button className="button-input" onClick = { e => setReady(true)}>Submit</button> : <button className="button-input" disabled >Submit</button>}
                </div>
                <div className = "box">
                    <button className="button-input" onClick = { e => Reset()}>Reset</button>
                </div>
            </div>
        </div>
        <div className = "wrapper">
            <div className ={accesibleMode ? "output-container-access" : "output-container"}>
                <div className="cityOut">
                       {ready ? <Yelp data={city}/> : <div ></div>}
                </div>
                <div className="foodOut">
                       {ready ?<Food meat={meat} veg={veg} carb={carb}/> : <div></div>}
                </div>
                <div className="musicOut">
                       {ready ? <Spotify genre={genre} /> : <div></div>}
                </div>
            </div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Body;
