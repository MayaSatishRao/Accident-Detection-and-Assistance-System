import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Login from './Login';
import AdminAlert from "./AdminAlert"
import HospitalAlert from "./HospitalAlert"
import PoliceAlert from "./PoliceAlert"

import Alerts from './Alerts';

function App() {


 

  return (
      
     
     <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<Login/>} />
           <Route exact path="/alerts" element={<AdminAlert/>} />
           <Route exact path="/policealerts" element={<PoliceAlert/>} />
           <Route exact path="/hospitalalerts" element={<HospitalAlert/>} />
           <Route exact path="/accident_details" element={<Alerts/>}/>
         </Routes>
     </BrowserRouter>
     
    
    
  );
}

export default App;
