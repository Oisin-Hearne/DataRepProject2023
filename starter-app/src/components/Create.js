import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function Create() {

  const [monsData, setData] = useState([]);

  //Alongside accessing the teams API stored in mongodb, I'm also using an online API
  //"PokeAPI" just to get the names and details of Pokémon so displaying them is easier.
  useEffect(
    () => {
      axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=905").then(
        (response) => {
          console.log(response.data.results);
          setData(response.data.results);
        }
      ).catch(
        (error) => {
          console.log(":(")
          console.log(error);
        }
      );
    }, []
  );

  const [name, setName] = useState('');
  const [mons, setMons] = useState(['','','','','','']);
  const [creator, setCreator] = useState('');
  const imgURL = "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"

  //Same Method as used in Edit used here.
  function changeMons(index, newMon) {
    const updatedMons = mons.map((mon, i) => {
      if (i === index)
        return newMon;
      else
        return mon;
    })

    setMons(updatedMons)
    //Also updates the source of the image attached to the form option, displaying the pokemon chosen.
    document.getElementById('img'+index).src = imgURL+newMon+".png";
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents data from being submitted multiple times

    //Post team to server

    const team = {
      teamName: name,
      pokemon: mons,
      creator: creator
    }
    postTeam(team);
  };

  function postTeam(team) {
    axios.post("http://localhost:4000/api/teams", team).then(
      (response) => {
        console.log(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  //onChange below lets the valeus of title, author and cover be updated every time the user changes the field.
  return (
    <div className="form-group" style={{ margin: "auto", width: "50%", textAlign: "center", padding: "10px" }}><h2><i>Create a team!</i></h2>
      <Form onSubmit={handleSubmit}>
        <Row classname="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Team Name</Form.Label>
            <Form.Control type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
            <Form.Text muted>Select a name for your team!</Form.Text>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Team Creator</Form.Label>
            <Form.Control type="text" className="form-control" value={creator} onChange={(e) => { setCreator(e.target.value) }} /><br />
            <Form.Text muted>Input the name of the person creating the team!</Form.Text>
          </Form.Group>
        </Row>
        <br/><br/>
        <Row classname="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Select some Pokémon!</Form.Label>
          </Form.Group>
        </Row>
        <Row classname="mb-3">

        <Form.Group as={Col}>
            <Form.Label>1</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(0, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.map((poke) => (<option>{poke.name}</option>))}
            </Form.Select>
            <Image src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown-gen5.png" id="img0" width="68" height="56"/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>2</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(1, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.map((poke) => (<option>{poke.name}</option>))}
            </Form.Select>
            <Image src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown-gen5.png" id="img1" width="68" height="56"/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>3</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(2, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
            <Image src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown-gen5.png" id="img2" width="68" height="56"/>
          </Form.Group>

        </Row>
        <Row classname="mb-3">

        <Form.Group as={Col}>
            <Form.Label>4</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(3, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
            <Image src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown-gen5.png" id="img3" width="68" height="56"/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>5</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(4, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
            <Image src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown-gen5.png" id="img4" width="68" height="56"/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>6</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(5, e.target.value)}}>
              <option>Select a Pokémon!</option>
              
              {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
            <Image src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/unknown-gen5.png" id="img5" width="68" height="56"/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Button type="Submit">Upload Team</Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );

}

export default Create;