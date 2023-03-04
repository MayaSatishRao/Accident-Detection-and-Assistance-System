import React from "react"
import Navigationbar from "./component/Navigationbar";
import VehicleForm from "./component/VehicleForm";
import VehicleTable from "./component/VehicleTable";
import VictimForm from "./component/VictimForm";
import VictimTable from "./component/VictimTable";

import {useLocation} from "react-router-dom"
import AccidentInfo from "./component/AccidentInfo";
const Alerts = ()=>{

    const location = useLocation();
    console.log(location)
    return (
        <>
        <Navigationbar/>
          <div className="alerts-container">
          <AccidentInfo accId={location.state.accId} police={location.state.police} hospital = {location.state.hospital}/>
          <VictimTable accId = {location.state.accId} />
          <VehicleTable accId = {location.state.accId}/>
         <VictimForm accId = {location.state.accId}/>
         <VehicleForm accId = {location.state.accId}/>
           </div>
         
        </>
    )
}

export default Alerts;