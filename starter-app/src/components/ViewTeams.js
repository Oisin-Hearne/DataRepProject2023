import React from 'react';
import Teams from './Teams';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Read() {

  const [teamData, setData] = useState([]);

  //Retrieves the list of teams from the database & sets teamData to them.
  useEffect(
    () => {
      axios.get("http://localhost:4000/api/teams").then(
        (response)=>{
          setData(response.data);
        }
      ).catch(
        (error)=>{
          console.log(error);
        }
      );
    },[]
  );

  //Reloads the data, for whenever a team is deleted.
  const ReloadData = (e) => {
    axios.get("http://localhost:4000/api/teams").then(
      (response)=>{
        setData(response.data);
      }
    ).catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  //Calls teams and passes it the teamData, which then calls teamrow which formats the data into a row for the table.
  return (
    <div className="form-group" style={{ margin: "auto", width: "80%", textAlign: "center", padding: "10px" }}>
    <h2>Current Teams</h2>
      <Teams teams={teamData} Reload={ReloadData}></Teams>
    </div>
  );

}


export default Read;