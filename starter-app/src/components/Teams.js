import TeamItem from "./TeamItem";
import Table from 'react-bootstrap/Table';

//Reads the TeamData array and converts it to a map.
//For every team, also calls the TeamItem component
//to display it.
function Teams(props) {
    return props.teams.map(
        (team)=>{
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Team Creator</th>
                            <th>Pokémon</th>
                            <th>Edit / Delete ?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TeamItem t={team} reload={()=>{props.Reload()}}></TeamItem>
                    </tbody>
                </Table>);
        }
    );
}
export default Teams;