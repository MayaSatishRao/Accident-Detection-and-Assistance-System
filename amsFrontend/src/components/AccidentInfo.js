import React, {useState, useEffect} from "react"

import AccImage from "../assets/accImage.jpg"
const AccidentInfo = ({accId, police, hospital})=>{

    console.log(accId,police,hospital)
    const [info,setInfo] = useState({
        
          id: 1,
          latitude: "",
          longitude: "",
          date: "",
          time: "",
    });

    useEffect(()=>{
        getEntries();
    },[]);
 
    const getEntries = async ()=>{
        let url = "http://localhost:8000/api/accident/"+accId+"/";
        let response = await fetch(url);
        let data = await response.json();
 
        console.log("acc data is ",data);
        setInfo(data);
    }
    return (
        <div className="main">
        <div>
            <h1 className="heading" style={{fontFamily:"'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif"}}>Accident Report</h1>
        </div>
        <div className="container card " style={{backgroundColor:"#FFF4D2"}}>
            <div className="row">
                <div className="col-8">
                    <p>Accident Date: {info.date}</p>
                    <p>Accident Time: {info.time}</p>
                    <div className="row">
                        <div Name="col-3">
                            <p className="left">Accident Location:</p>
                        </div>
                        <div className="col-7">
                            <p>Latitude : {info.latitude}</p>
                            <p>Longitude: {info.longitude}</p>
                        </div>
                    </div>
                    <p>Alerted Police Station: {police}</p>
                    <p>Informed Hospital: {hospital}</p>
                </div>                
                <div className="col-4 img-out">
                    <img src={AccImage} className="image"/>
                </div>
            </div>
        </div>
      </div>
    )
}

export default AccidentInfo;

// <img src={AccImage} style={{width:"300px",height:"300px"}}/>
