import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import Navbar from "../Navbar";


const Signup = () => {
   
 
  const [name,setname]= useState("")
  const [email,setemail]= useState("")
  const [password,setpassword]= useState("")
  const [password_confirm,setpasswordconfirm]= useState("")
  const[errorMessage,setErrorMessage] = useState('');
  const navigate=useNavigate();
  const handlename=(e)=>{setname(e.target.value)}
  const handleemail=(e)=>{setemail(e.target.value)}
  const handlepassword=(e)=>{setpassword(e.target.value)}
  const handlepasswordconfirm=(e)=>{setpasswordconfirm(e.target.value)}
  
    const click=()=>
    { 
      var user = {
        name: name,
        email: email,
        password: password,
        password_confirmation:password_confirm
    }

    console.log(user);
    axios.post(`https://medicalstore.mashupstack.com/api/register`,user)
      
    .then(result=>{
      setErrorMessage('');
      console.log('Log In Successfully');
      navigate('/login') })
    .catch(error=>{
      if(error.response.data.errors){
          setErrorMessage(Object.values(error.response.data.errors).join(' '));
      }else{
          setErrorMessage('Failed to connect to api');
      }
    })
    
    }

  return (
    <div>
        <Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            
             <h1 className="p-3 mb-2 text-dark">MEDICAL STORE</h1><br /><br />
             <h2>SIGN IN</h2>
             {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
          <div className="form-group">
             <label htmlFor="">Name:</label>
                <input className="form-control" value={name} onChange={handlename} type="text" />
          </div>
              <br />
              <div className="form-group">
                <label htmlFor="">Email:</label>
                <input className="form-control" value={email} onChange={handleemail} type="text"/>
               
                 
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="">Password:</label>
                <input className="form-control" value={password} onChange={handlepassword} type="password"
                
                 />
            </div><br />

            <div className="form-group">
                <label htmlFor="">Password Confirmation:</label>
              <input className="form-control" value={password_confirm} onChange={handlepasswordconfirm} type="password" 
              />
            </div><br />

          <div className="form-group">
            <button className="btn btn-primary float-right" onClick={click}>SUBMIT </button>
          </div> 
            
            </div>
    </div>
    </div>
    </div>
  )
}

export default Signup;