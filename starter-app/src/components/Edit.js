import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Edit(props) {
    let { id } = useParams();

    const [name, setName] = useState("");
    const [creator, setCreator] = useState("");
    const [mons, setMons] = useState([""]);

    function changeMons(index, newMon) {
        //I learned this trick from the react docs here: https://react.dev/learn/updating-arrays-in-state
        //This function is called from the multiple input boxes created by iterating through the mons array.
        //It updates the mon at that index (leaving the others alone) in updatedMons, then sets mons to updatedMons.
        const updatedMons= mons.map((mon, i) => {
            if(i === index) 
                return newMon;
            else
                return mon;
        })
        setMons(updatedMons)
    }

    const nav = useNavigate();

    //Current values of the given team.
    useEffect(() => {
        axios.get('http://localhost:4000/api/teams/searchID/'+id)
        .then((response) => {
            response.data.forEach(team => {
                console.log(team);
                setName(team.teamName);
                setCreator(team.creator);
                setMons(team.mons);
            });

        }).catch(function (error) {
            console.log(error);
        })
    }, []);

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
        axios.put('http://localhost:4000/api/teams/'+id, newTeam)
        .then((res) => {
            console.log(res.data);
            nav('/read');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Change Team Name: </label><br/>
                    <input type="text" classname="form-control" value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </div><br/>
                <div className="form-group">
                    <label>Change Creator: </label><br/>
                    <input type="text" classname="form-control" value={creator}
                    onChange={(e) => setCreator(e.target.value)}/>
                </div><br/>
                <div className="form-group">
                    <label>Change Pokémon: </label><br/>
                    <ul>
                        {
                            mons.map((mon, i) => 
                            <li key={i}><input type="text" classname="form-control" value={mon}
                                onChange={
                                    (e) => changeMons(i, e.target.value)
                            }/></li>)
                        }
                    </ul>
                </div><br/>
                <div className="form-group">
                    <input type="submit" value="Update Team" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );


}
