import React, {useState} from "react";

const VehicleForm = ({accId})=>{

    const [formFeilds, setFormFields] = useState([{
        regNum:"",
        model:"",
        color:"",
        brand:"",
        owner:"",
    }]);

    const formChangeHandler = (e,index)=>{

         let data = [...formFeilds];
         data[index][e.target.name] = e.target.value;
         setFormFields(data);

         console.log(index, e.target.name, e.target.value);
    };

    const checkForValidity = ()=>{
        for(let i=0;i<formFeilds.length;i++){
            let num = formFeilds[i].regNum;
            if(!num.match("[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}") || num.length!==10){
                alert("Enter proper registration number for vehicle "+(i+1));
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
                let response = await fetch("http://localhost:8000/api/addvehicles/",{
                    method:'POST',
                    body:JSON.stringify(formFeilds[i]),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }
                });
                let data = await response.json();
                console.log(JSON.stringify(formFeilds[i]));
            }
    
            window.location.reload(true)
        }
    }

    const addFeilds = ()=>{
        let obj = {
            regNum:"",
        model:"",
        color:"",
        brand:"",
        owner:"",
        }

        setFormFields([...formFeilds, obj]);
    }

    const removeFeilds = (index)=>{
        let data = [...formFeilds];
        data.splice(index,1);
        setFormFields(data);
    }

    return (
        <div className="fit">
        <div className="container">
            <div className="card mt-5" style={{backgroundColor:"antiquewhite", color:"black"}}>
                <h5 className="form-heading">Add Vehicle Details</h5>
            </div>
            
            <form id="details_form" onSubmit={submitButtonHandler}>
            {formFeilds.map((form, index)=>{
                return (
                    
                    <div className="piece" id="comp1" style={{marginTop: "20px", marginBottom: "20px"}} key={index}>
                        <h3>Vehicle {index+1}</h3>
                        <div className="row" id="row1">
                            <div className="col-4">
                                <label>Car Registration Number</label>
                                <input type="text" className="form-control" name="regNum"  placeholder="Car registration Number" onChange={(e)=>formChangeHandler(e,index)} value={form.regNum}/>
                            </div>
                            <div className="col-4">
                                <label>Car Model</label>
                                <input type="text" className="form-control" name="model"  placeholder="Car Model" onChange={(e)=>formChangeHandler(e,index)} value={form.model}/>
                            </div>
                            <button type="button" className="btn btn-danger float-right mt-4 col-2" onClick={()=>removeFeilds(index)}>Remove -</button>
                        </div>
                        <div className="row" id="row2">
                            <div className="col-4">
                                <label>Car Color</label>
                                <input type="text" className="form-control" name="color"  placeholder="Car Color" onChange={(e)=>formChangeHandler(e,index)} value={form.color}/>
                            </div>
                            <div className="col-4">
                                <label>Car Brand</label>
                                <input type="text" className="form-control" name="brand"  placeholder="Car Brand" onChange={(e)=>formChangeHandler(e,index)} value={form.brand}/>
                            </div>
                            <div className="col-4">
                                <label>Car Owner</label>
                                <input type="text" className="form-control" name="owner"  placeholder="Car Owner" onChange={(e)=>formChangeHandler(e,index)} value={form.owner}/>
                            </div>
                        </div>
                    </div>
            
                )
            })}
            </form>

            <button id="btn1" className="btn btn-dark float-right mt-2" onClick={addFeilds}>Add another Vehicle +</button>
            <div>
            <button id="btn1" className="btn btn-dark float-right mt-2" onClick={submitButtonHandler}>Submit</button>
            </div>
        </div>
       </div>
    )
}

export default VehicleForm;

