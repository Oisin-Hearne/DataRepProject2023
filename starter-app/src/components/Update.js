import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export default function Update(props) {
    let { id } = useParams();

    const [name, setName] = useState("");
    const [creator, setCreator] = useState("");
    const [mons, setMons] = useState(['', '', '', '', '', '']);

    function changeMons(index, newMon) {
        //I learned this trick from the react docs here: https://react.dev/learn/updating-arrays-in-state
        //This function is called from the multiple input boxes created by iterating through the mons array.
        //It updates the mon at that index (leaving the others alone) in updatedMons, then sets mons to updatedMons.
        const updatedMons = mons.map((mon, i) => {
            if (i === index)
                return newMon;
            else
                return mon;
        })
        setMons(updatedMons)
    }

    const nav = useNavigate();

    //Current values of the given team.
    useEffect(() => {
        axios.get('http://localhost:4000/api/teams/searchID/' + id)
            .then((response) => {
                response.data.forEach(team => {
                    console.log(team);
                    setName(team.teamName);
                    setCreator(team.creator);
                    setMons(team.pokemon);
                });

            }).catch(function (error) {
                console.log(error);
            })
    }, []);

    const [monsData, setData] = useState([]);

    //Pokemon Names
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

    //Submit the updated team.
    const handleSubmit = (event) => {
        event.preventDefault();
        const newTeam = {
            id: id,
            teamName: name,
            creator: creator,
            pokemon: mons
        };

        //Uploads the team to the server in place of the team that's currently there.
        axios.put('http://localhost:4000/api/teams/' + id, newTeam)
            .then((res) => {
                console.log(res.data);
                nav('/ViewTeams');
            });
    }

    //Layout is mostly similar to CreateTeam, just autofilled with the values retrieved from the team to be edited.
    return (
        <div className="form-group" style={{ margin: "auto", width: "50%", textAlign: "center", padding: "10px" }}><i><h2>Editing Team...</h2></i>
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
                <br /><br />
                <Row classname="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Select some Pokémon!</Form.Label>
                    </Form.Group>
                </Row>
                <Row classname="mb-3">

                    <Form.Group as={Col}>
                        <Form.Label>1</Form.Label>
                        <Form.Select className="form-control" value={mons[0]} onChange={(e) => { changeMons(0, e.target.value) }}>
                            <option>Select a Pokémon!</option>
                            {monsData.map((poke) => (<option>{poke.name}</option>))}
                        </Form.Select>
                        <Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+mons[0]+".png"} id="img5" width="68" height="56" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>2</Form.Label>
                        <Form.Select className="form-control" value={mons[1]} onChange={(e) => { changeMons(1, e.target.value) }}>
                            <option>Select a Pokémon!</option>
                            {monsData.map((poke) => (<option>{poke.name}</option>))}
                        </Form.Select>
                        <Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+mons[1]+".png"} id="img5" width="68" height="56" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>3</Form.Label>
                        <Form.Select className="form-control" value={mons[2]} onChange={(e) => { changeMons(2, e.target.value) }}>
                            <option>Select a Pokémon!</option>
                            {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
                        </Form.Select>
                        <Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+mons[2]+".png"} id="img5" width="68" height="56" />
                    </Form.Group>

                </Row>
                <Row classname="mb-3">

                    <Form.Group as={Col}>
                        <Form.Label>4</Form.Label>
                        <Form.Select className="form-control" value={mons[3]} onChange={(e) => { changeMons(3, e.target.value) }}>
                            <option>Select a Pokémon!</option>
                            {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
                        </Form.Select>
                        <Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+mons[3]+".png"} id="img5" width="68" height="56" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>5</Form.Label>
                        <Form.Select className="form-control" value={mons[4]} onChange={(e) => { changeMons(4, e.target.value) }}>
                            <option>Select a Pokémon!</option>
                            {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
                        </Form.Select>
                        <Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+mons[4]+".png"} id="img5" width="68" height="56" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>6</Form.Label>
                        <Form.Select className="form-control" value={mons[5]} onChange={(e) => { changeMons(5, e.target.value) }}>
                            <option>Select a Pokémon!</option>

                            {monsData.map((poke) => (<option value={poke.name}>{poke.name}</option>))}
                        </Form.Select>
                        <Image src={"https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/"+mons[5]+".png"} id="img5" width="68" height="56" />
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
