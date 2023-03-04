import React, {useState} from "react";

const VictimForm = ({accId})=>{

    const [formFeilds, setFormFields] = useState([{
        name:"",
        phone:"",
        street:"",
        city:"",
        state:"",
    }]);

    const formChangeHandler = (e,index)=>{

         let data = [...formFeilds];
         data[index][e.target.name] = e.target.value;
         setFormFields(data);

         console.log(index, e.target.name, e.target.value);
    };

    const checkForValidity = ()=>{
        for(let i=0;i<formFeilds.length;i++){
            let num = formFeilds[i].phone;
            if(!num.match("[0-9]{10}") || num.length!==10){
                alert("Enter proper phone number for victim "+(i+1));
                return 0;
            }
              
        }
        return 1;
    }
    
    const submitButtonHandler = async ()=>{
        if(checkForValidity()!=0){
            formFeilds.map(formFeild=>formFeild["accId"]=accId)
            console.log(formFeilds);
    
            for(let i=0;i<formFeilds.length;i++){
                let response = await fetch("http://localhost:8000/api/addvictims/",{
                    method:'POST',
                    body:JSON.stringify(formFeilds[i]),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                });
                let data = await response.json();
                console.log(data);
            }
    
            window.location.reload(true)
        }    
    }
    const addFeilds = ()=>{
        let obj = {
            name:"",
            phone:"",
            street:"",
            city:"",
            state:"",
        }
        setFormFields([...formFeilds, obj]);
    }

    const removeFeilds = (index)=>{
        console.log("remove button clicked");
        let data = [...formFeilds];
        data.splice(index,1);
        setFormFields(data);
    }

    return (
        <div className="fit">
        <div className="container">
            <div className="card mt-5" style={{backgroundColor:"antiquewhite", color:"black"}}>
                <h5 className="form-heading">Add Victim Details</h5>
            </div>
            
            <form id="details_form" onSubmit={submitButtonHandler}>
            {formFeilds.map((form, index)=>{
                return (
                    
                    <div className="piece" id="comp1" style={{marginTop: "20px", marginBottom: "20px"}} key={index}>
                        <h3>Victim {index+1}</h3>
                        <div className="row" id="row1">
                            <div className="col-4">
                                <label>Victim Name</label>
                                <input aria-required type="text" className="form-control" name="name" id="Name" placeholder="Name" onChange={(e)=>formChangeHandler(e,index)} value={form.name}/>
                            </div>
                            <div className="col-4">
                                <label>Victim Phone Number</label>
                                <input onInvalid={()=>alert("Enter valid phone number")} 
                                         type="text" 
                                       className="form-control" name="phone" 
                                       id="phone" placeholder="Phone number" 
                                       onChange={(e)=>formChangeHandler(e,index)} value={form.phone}/>
                            </div>
                            <button type="button" className="btn btn-danger float-right mt-4 col-2" onClick={()=>removeFeilds(index)}>Remove -</button>
                        </div>
                        <div className="row" id="row2">
                            <div className="col-4">
                                <label>Street</label>
                                <input type="text" className="form-control" name="street" id="street" placeholder="Street" onChange={(e)=>formChangeHandler(e,index)} value={form.street}/>
                            </div>
                            <div className="col-4">
                                <label>City</label>
                                <input type="text" className="form-control" name="city" id="city" placeholder="City" onChange={(e)=>formChangeHandler(e,index)} value={form.city}/>
                            </div>
                            <div className="col-4">
                                <label>State</label>
                                <input required={true} type="text" className="form-control" name="state" id="state" placeholder="State" onChange={(e)=>formChangeHandler(e,index)} value={form.state}/>
                            </div>
                        </div>
                    </div>
            
                )
            })}
            </form>

            <button id="btn1" className="btn btn-dark float-right mt-2" onClick={addFeilds}>Add another Victim +</button>
            <div>
            <button id="btn1" className="btn btn-dark float-right mt-2" onClick={submitButtonHandler}>Submit</button>
            </div>
            
        </div>
       </div>
    )
}

export default VictimForm;

