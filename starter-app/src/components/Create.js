import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function Create() {


  const [monsData, setData] = useState([]);

  //Alongside accessing the teams API stored in mongodb, I'm also using an online API
  //"PokeAPI" just to get the names and details of Pokémon so displaying them is easier.
  useEffect(
    () => {
      axios.get("https://pokeapi.co/api/v2/pokemon").then(
        (response) => {
          setData(response.data);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }, []
  );

  const [name, setName] = useState('');
  const [mons, setMons] = useState(['']);
  const [creator, setCreator] = useState('');

  //Same Method as used in Edit used here.
  function changeMons(index, newMon) {
    const updatedMons = mons.map((mon, i) => {
      if (i === index)
        return newMon;
      else
        return mon;
    })
    setMons(updatedMons)
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
              {monsData.results.map((poke) => (<option>{poke.name}</option>))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>2</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(1, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.results.map((poke) => (<option>{poke.name}</option>))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>3</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(2, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.results.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
          </Form.Group>

        </Row>
        <Row classname="mb-3">

        <Form.Group as={Col}>
            <Form.Label>4</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(3, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.results.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>5</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(4, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.results.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>6</Form.Label>
            <Form.Select className="form-control" onChange={(e) => {changeMons(5, e.target.value)}}>
              <option>Select a Pokémon!</option>
              {monsData.results.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
            </Form.Select>
          </Form.Group>
        </Row>
        

        <input type="text" className="form-control" value={cover} onChange={(e) => { setCover(e.target.value) }} /><br />
        <br /><input type="submit" className="form-control" value="Add Book" />

      </Form>
    </div>
  );

}

export default Create;