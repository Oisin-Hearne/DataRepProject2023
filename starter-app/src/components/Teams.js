import TeamRow from "./TeamRow";
import Table from 'react-bootstrap/Table';

//Sets up the table for displaying Teams and for each team in the data passed into props,
//Teams will call TeamItem to create a row for it.
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
                            <th>Modify Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TeamRow t={team} reload={()=>{props.Reload()}}></TeamRow>
                    </tbody>
                </Table>);
        }
    );
}
export default Teams;