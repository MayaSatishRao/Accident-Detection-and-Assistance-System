import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const VehicleTable = ({accId})=>{

  const [entries, setEntries] = useState([]);

   useEffect(()=>{
       getEntries();
   },[]);

   const getEntries = async ()=>{
       let url = "http://localhost:8000/api/accvehicles/"+accId+"/";
       let response = await fetch(url);
       let data = await response.json();

       setEntries(data);
   }
   return (
    <div className="fit">
        <div className="container">
         <h1 className="table-heading"> Vehicles involved in accident</h1>
        <Table striped bordered hover responsive style={{borderColor:"black"}}>
    <thead>
      <tr>
        <th>#</th>
        <th>Registration Number</th>
        <th>Model</th>
        <th>Color</th>
        <th>Brand</th>
        <th>Owner</th>

      </tr>
    </thead>
    <tbody>
    {entries.map((entry,index)=>{
       return (
        <tr>
        <td>{index+1}</td>
        <td>{entry.regNum}</td>
        <td>{entry.model}</td>
        <td>{entry.color}</td>
        <td>{entry.brand}</td>
        <td>{entry.owner}</td>
      </tr>
       )
    })}
    </tbody>
  </Table>
        </div>
    </div>
    
   );
}

export default VehicleTable;