import React from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import PokeDetails from './PokeDetails';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dex() {

  const [monData, setData] = useState([]);

  //Retrieves data from our server and sets the value of TeamData to the books array returned
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
      <Table>
        <thead>
          <tr>
            <th>Dex #</th>
            <th>Sprite</th>
            <th>Name</th>
            <th>Type</th>
            <th>Abilities</th>
            <th>Stats</th>
          </tr>
        </thead>
        <tbody>
          {monData.map((mon,i) => {
            <tr key={i}>
              
              <PokeDetails name={mon.name} index={i}></PokeDetails>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
  );

}


export default Dex;