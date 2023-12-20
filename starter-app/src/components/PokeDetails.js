import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';


function PokeDetails(props) {

    const [monDetails, setDetails] = useState([]);

    //Retrieves data from our server and sets the value of TeamData to the books array returned
    useEffect(
      () => {
        axios.get("https://pokeapi.co/api/v2/pokemon/"+props.name).then(
          (response)=>{
            setDetails(response.data);
            console.log(response.data);
          }
        ).catch(
          (error)=>{
            console.log(error);
          }
        );
      },[]
    );

    return (
        <tr>
            <td>{props.index+1}</td>
            <td><Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+props.name+".png"}/></td>
            <td>{props.name}</td>
        <td><ul class="list-group list-group-horizontal">{monDetails.types.map((t) => {
            <li class="list-group-item">{t.type.name}</li>
            })}</ul></td>
        <td><ul class="list-group list-group-horizontal">{monDetails.abilities.map((ab) => {
            <li class="list-group-item">{ab}</li>
            })}</ul></td>
        <td><ul class="list-group list-group-horizontal">{monDetails.stats.map((s) => {
            <li class="list-group-item"><b>{s.stat.name}</b>: {s.base_stat}</li>
            })}</ul></td>
        </tr>
    );
}

export default PokeDetails;