import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const VictimTable = ({accId})=>{

   const [entries, setEntries] = useState([]);

   useEffect(()=>{
       getEntries();
   },[]);

   const getEntries = async ()=>{
       let url = "http://localhost:8000/api/accvictims/"+accId+"/";
       let response = await fetch(url);
       let data = await response.json();

       console.log(data);
       setEntries(data);
   }
   return (
    <div className="fit">
        <div className="container">
         <h1 className="table-heading"> Victims of Accident</h1>
        <Table striped bordered hover responsive style={{borderColor:"black"}}>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Street</th>
        <th>City</th>
        <th>State</th>

      </tr>
    </thead>
    <tbody>

    {entries.map((entry,index)=>{
       return (
        <tr>
        <td>{index+1}</td>
        <td>{entry.name}</td>
        <td>{entry.phone}</td>
        <td>{entry.street}</td>
        <td>{entry.city}</td>
        <td>{entry.state}</td>
      </tr>
       )
    })}
    
    </tbody>
  </Table>
        </div>
    </div>
    
   );
}

export default VictimTable;