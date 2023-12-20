import React from 'react';
import PokeDetails from './PokeDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dex() {

  const [monData, setData] = useState([]);

  //Retrieves a list of all pokemon up to Generation 8 by using PokeAPI.
  //I thought that maybe this could be put in another collection, but given that it never
  //changes I hoped it'd be okay to just use the online version.
  useEffect(
    () => {
      axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=905").then(
        (response)=>{
          setData(response.data.results);
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      );
    },[]
  );
  

  return (
    <div className="form-group" style={{ margin: "auto", width: "50%", textAlign: "center", padding: "10px" }}><i><h2>PokéDex</h2></i>
    <PokeDetails mons={monData} ></PokeDetails>
    </div>
  );

}


export default Dex;