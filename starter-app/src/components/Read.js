import React from 'react';
import Books from './Teams';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Read() {

  const [teamData, setData] = useState([]);

  //Retrieves data from our server and sets the value of TeamData to the books array returned
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

  //Reloads the data. A method to be called by TeamItem whenever
  //the delete button is pressed.
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
  

    //Read calls Books, Books calls BookItem.
  return (
    <div>
      <h2>Read Component</h2>
      <Books teams={teamData} Reload={ReloadData}></Books>
    </div>
  );

}


export default Read;