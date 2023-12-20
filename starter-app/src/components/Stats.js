import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

//Displays the name, number and image of each pokemon passed to it.
function Stats(props) {

    return (
        <tr>
            <td>{props.index+1}</td>
            <td>{(props.name).charAt(0).toUpperCase() + (props.name).slice(1)}</td>
            <td><Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+props.name+".png"} /></td>
        </tr>
    );
}

export default Stats;