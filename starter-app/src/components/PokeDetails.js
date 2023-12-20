import Table from 'react-bootstrap/Table';
import Stats from './Stats';

function PokeDetails(props) {

  //Sets up the table for listing all pokémon.
  //The column stuff was some experimenting, trying to get the proportions of the table right.
    return props.mons.map(
      (mon, i) => {
        return (
          <Table striped hover>
            <thead>
              <tr>
                <th class="col-1 col-lg-1 col-md-8">Dex #</th>
                <th class="col-12 col-lg-6 col-md-8">Name</th>
                <th class="col-12 col-lg-6 col-md-8">Sprite</th>
              </tr>
            </thead>
            <tbody>
              <Stats name={mon.name} index={i}></Stats>
            </tbody>
          </Table>
        )
      }


    );
}

export default PokeDetails;