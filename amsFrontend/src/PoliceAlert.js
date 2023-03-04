import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button"
import {useNavigate, useLocation} from "react-router-dom"
import Navigationbar from "./component/Navigationbar";

const AlertTable = ()=>{

  const [entries, setEntries] = useState([])

  const location = useLocation();
  const id = location.state.id;
  console.log(location);

  

  useEffect(()=>{
      getEntries();

  },[]);

  let getEntries = async()=>{
      let response = await fetch('http://localhost:8000/api/policealerts/'+id);
      let data = await response.json();
      setEntries(data);
  }
 
  
 
 const navigation = useNavigate();
   
   const buttonHandler = (index)=>{
       console.log(index,entries[index])
       navigation("/accident_details",{state:{accId:entries[index].accId}});
   }

   const attendButtonHandler = async (index)=>{
    
    console.log("in")
    
    if(entries!=null && entries[index]!=null){
      let res = await fetch("http://localhost:8000/api/polattend/"+entries[index].accId);
      let data = await res.json();
      console.log(data)
      if(data === "success"){
          getEntries()
        alert("Updated successfully");
  
     }
     else
       alert("Could not update");
     }
    }
    

   return (
    <>
    <Navigationbar/>
    <div className="fit">
    <div className="container">

    <h1> Latest Alerts</h1>
    <Table striped bordered hover responsive style={{borderColor:"black"}}>
    <thead>
      <tr>
        <th>#</th>
        <th>Accident Location</th>
        <th>Accident Time</th>
        <th>Alerted Hospital</th>
        <th>Alert Status</th>
      </tr>
    </thead>
    <tbody>

      
      {entries.map((entry,index)=>{

         if(!entry.polAttend)
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
            <td>{entry.hospital}</td>
            <td>
              <Button onClick={()=>attendButtonHandler(index)}>Attended</Button>
            </td>
           </tr>
         )
      })}
      </tbody>
  </Table>

      <h1>Previous Alerts</h1>
    <Table striped bordered hover responsive style={{borderColor:"black"}}>
    <thead>
      <tr>
        <th>#</th>
        <th>Accident Location</th>
        <th>Accident Time</th>
        <th>Alerted Hospital</th>
        <th>Accident Details</th>
      </tr>
    </thead>
    <tbody>

      {entries.map((entry,index)=>{
        if(entry.polAttend)
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
            <td>{entry.hospital}</td>
            <td>
              <Button onClick={()=>buttonHandler(index)}>Know More</Button>
            </td>
           </tr>
         )
      })}
      
    </tbody>
  </Table>
  </div>
  </div>
  </>
   );
}

export default AlertTable;