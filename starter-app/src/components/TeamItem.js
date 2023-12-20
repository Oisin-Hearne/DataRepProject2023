//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

//Displays the data of a team in a table.
//Fetches the images for the pokémon from the Pokesprite repository - https://msikma.github.io/pokesprite/overview/dex-gen8.html
function TeamItem(props) {

    return (
        <tr>
            <td>{props.t.teamName}</td>
            <td>{props.t.creator}</td>
            <td>{
                props.t.pokemon.map((mon) => (<Image src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/{mon}.png" />))
            }</td>
            <td>
                <Link to={"/edit/" + props.t._id} className="btn btn-primary">Edit</Link>
                <Button variant="danger" onClick={(e) => {
                    //Sends a delete request to the server with the ID of the current team.
                    axios.delete('http://localhost:4000/api/teams/deleteID/' + props.t._id)
                        .then((response) => {
                            //Refresh Read
                            let r = props.reload();
                        }).catch(function (error) {
                            console.log(error);
                        })
                }}>Delete</Button>
            </td>
        </tr>
    );
}

export default TeamItem;