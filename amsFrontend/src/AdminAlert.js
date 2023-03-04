import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import Navigationbar from "./component/Navigationbar";

import {useNavigate, useLocation} from "react-router-dom"



const AdminAlert = ()=>{

    
   const [entries, setEntries] = useState([])
   const location = useLocation();

   useEffect(()=>{
       getEntries();
   },[]);


   let getEntries = async()=>{
       let response = await fetch('http://localhost:8000/api/accalerts/');
       let data = await response.json();
       console.log(data);
       setEntries(data);
   }
  
  
  const navigation = useNavigate();
    

   return (

    <>
     <Navigationbar/>
    <div className="container">
    <Table striped bordered hover responsive style={{borderColor:"black"}}>
    <thead>
      <tr>
        <th>#</th>
        <th>Accident Location</th>
        <th>Accident Time</th>
        <th>Alerted Police Station</th>
        <th>Alerted Hospital</th>
        <th>Alert Status</th>
        <th>Accident Details</th>
        
      </tr>
    </thead>
    <tbody>

      {entries.map((entry,index)=>{
        console.log(entry);
         return (
          <tr>
            <td>{index+1}</td>
            <td>
             <tr>Latitude:{entry.latitude}</tr>
             <tr>Longitude: {entry.longitude}</tr>
             </td>
             <td>
             <tr>Date: {entry.date}</tr>
             <tr>Time: {entry.time}</tr>
             </td>
            <td>{entry.police}</td>
            <td>{entry.hospital}</td>
            <td>
             <tr>Police: {entry.polAttend? "Attended": "Not attended"}</tr>
             <tr>Hospital: {entry.hosAttend? "Attended": "Not attended"}</tr>
             </td>
            <td>
              <Button onClick={()=>{
              navigation("/accident_details", {state:{accId:entry.accId, police:entry.police, hospital:entry.hospital}})}
              }>Know More</Button>
            </td>
           </tr>
         )
      })}
      
    </tbody>
  </Table>
  </div>

    </>
    
   );
}

export default AdminAlert;

/**/