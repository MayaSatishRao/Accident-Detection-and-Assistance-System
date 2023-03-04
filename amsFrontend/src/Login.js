import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Form} from 'react-bootstrap';





const Login = ()=>{

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    

    const navigate = useNavigate();
    
    const loginButtonHandler = async (e)=>{
        e.preventDefault();
        let response = await fetch("http://localhost:8000/api/login/",{
            method:'POST',
            body:JSON.stringify({
              username:username,
              password:password,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        });
        let data = await response.json();
        
        if(data.success === "true"){
            if(data.username==="admin")
              navigate("/alerts",{state:{username:data.username}});
            else if(data.username.substring(0,3)=== "pol")
               navigate("/policealerts",{state:{id:username.substring(4)}});
            else{
                navigate("/hospitalalerts",{state:{id:username.substring(4)}});
                console.log("hospital")
            }
              
               
        }
        else
        alert("Invalid credentials");
    }

    return (

        <>
        <p className="logo-heading">AMS</p>
        <div className="login-container w-0">          
          <Form className="rounded p-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{
                    setUsername(e.target.value);
                    console.log(username);
                 }}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control type="password" placeholder="Password" onChange={(e)=>{
                    setPassword(e.target.value);
                    console.log(password);
                    }}/>
              </Form.Group>

              <Button className="w-100 mt-2 mb-2" variant="primary" type="submit" onClick={loginButtonHandler}>
                  Submit
               </Button>

            </Form>
        </div>
        </>
    )
}

export default Login;