import React,{useState} from "react";
//import React,{Component} from "react"
import axios from "axios";
//import axios from "axios";



function AddTourguide(){

  const [fullName,setFullName] = useState("");
  const [age,setAge] = useState("");
  const [address,setAddress] = useState("");
  const [dateOfBirth,setDateOfBirth] = useState("");
  const [contactNumber,setContactNumber] = useState("");
  const [gender,setGender] = useState("Male"); // Set default value here
  const [nicNumber,setNicNumber] = useState("");
  const [eMail,setEmail] = useState("");
  const [workExperience,setWorkExperience] = useState("");
  const [amount,setAmount]  = useState("");


  // (local function) sendData(e: any):void
  function sendData(e){
   e.preventDefault();
   
   const newTourguide={
     fullName,
     age,
     address,
     dateOfBirth,
     contactNumber,
     gender,
     nicNumber,
     eMail,
     workExperience,
     amount
   }
   //add data to database
   axios.post("http://localhost:8070/tourguide/add",newTourguide).then(()=>{
     alert("Tourguide Added")
   }).catch((err)=>{
     alert(err)
   })
  }

  return(
    <div className="container p-3 mb-2 bg-white text-black" style={{marginTop:'40px', borderRadius:'10px'}}> 
        <form onSubmit={sendData}>
      
        <div className="text-center">
          <h2><strong>Add Tourguide Details</strong></h2>
        </div>
        
        <div className="formcontainer"></div>
        <hr/>
        <div className="container"></div>

       
        <div className="row">
  
        <div className="form-group col-md-6">
          <label htmlFor="fullName" className="form-label text-black">Tourguide Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="fullName" 
            required 
            placeholder="Enter Tourguide Name" 
            onChange={(e) => setFullName(e.target.value)} 
          /> 
          <br/>
        </div>


        <div className="form-group col-md-6">
          <label htmlFor="age" className="form-label text-black">Age</label>
          <input 
            type="text" 
            className="form-control" 
            id="age" 
            required 
            placeholder="Enter Tourguide Age"  
            onChange={(e) => setAge(e.target.value)}
          /> 
          <br/>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="address" className="form-label text-black">Address</label>
          <input 
            type="text" 
            className="form-control" 
            id="address" 
            required 
            placeholder="Enter Tourguide Address"  
            onChange={(e) => setAddress(e.target.value)}
          /> 
          <br/>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="dateOfBirth" className="form-label text-black">Date Of Birth</label>
          <input 
            type="date" 
            className="form-control" 
            id="dateOfBirth" 
            required 
            placeholder="Enter Tourguide Birthday"  
            onChange={(e) => setDateOfBirth(e.target.value)}
          /> 
          <br/>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="contactNumber" className="form-label text-black">Contact Number</label>
          <input 
            type="number" 
            className="form-control" 
            id="contactNumber" 
            required 
            placeholder="Enter Tourguide Contact Number"  
            onChange={(e) => setContactNumber(e.target.value)}
          /> 
          <br/>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="gender" className="form-label text-black">Gender</label>
          <select 
            id="gender" 
            className="form-control" 
            required 
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>


        <div className="form-group col-md-6">
          <label htmlFor="nicNumber" className="form-label text-black">NIC Number</label>
          <input 
            type="text" 
            className="form-control" 
            id="nicNumber" 
            placeholder="Enter Tourguide NIC Number"  
            onChange={(e) => setNicNumber(e.target.value)}
          /> 
          <br/>
        </div>


        <div className="form-group col-md-6">
          <label htmlFor="eMail" className="form-label text-black">E mail</label>
          <input 
            type="email" 
            className="form-control" 
            id="eMail" 
            placeholder="Enter Tourguide Email" 
            onChange={(e) => setEmail(e.target.value)}
          /> 
          <br/>
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="workExperience" className="form-label text-black">Work Experience</label>
          <input 
            type="text" 
            className="form-control" 
            id="workExperience" 
            placeholder="Enter Tourguide Work Experience"  
            onChange={(e) => setWorkExperience(e.target.value)}
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="amount" className="form-label text-black">Amount</label>
          <input 
            type="text" 
            className="form-control" 
            id="amount" 
            placeholder="Enter Tourguide expected Amount"  
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        </div>

        <br/>

        <button  
          type="submit" 
          className="btn btn-primary"  
          style={{marginTop:'20px', width:'300px', marginRight:'300px', marginLeft:'200px', borderRadius:'20px'}}
        >
          <strong>Submit</strong>
        </button>
       
        <a 
          href="/all/tourguide" 
          className="btn btn-primary" 
          style={{marginTop:'20px', width:'300px', marginLeft:'-20px', color:"white", marginRight:"10px", borderRadius:'20px'}}
        >
          <strong>Get AllTourguides</strong>
        </a>
              
        </form>
    </div>
  )
}

export default AddTourguide;