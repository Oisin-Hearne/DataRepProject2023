import React from 'react';

//Centered welcome page. 
class Home extends React.Component {
    render() {
      return ( <div
      style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}
      ><header> <h1>Pokémon Teambuilder</h1><h2>Welcome!</h2></header><p>Use the navbar to select any of these options:</p>
      <br/><ul><li><b>Teams</b> - See, edit & delete the currently available teams.</li>
      <li><b>Build</b> - Build a new team.</li>
      <li><b>Dex</b> - Find out more info about the available Pokémon.</li></ul></div>);
    }
}

export default Home;