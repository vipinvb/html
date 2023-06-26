import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector } from "react-redux";
import checkAuth from "./auth/checkAuth";

const Addmedicine = () => {

    var user = useSelector(store=>store.auth.user);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry, setExpiry] = useState('');
    var navigate = useNavigate()
    function add() {
        if (!name || !company || !expiry) {
            alert('Please fill in all the fields.');
            return;
        }
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name: name,
            company: company,
            expiry_date:expiry
        },{headers:{'Authorization':'Bearer '+user.token}}).then(response=>{
            navigate('/')
        })}
  return (
    <div>
        
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">ADD MEDICINE</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input type="text"
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>ExpiryDate:</label>
                        <input type="date" 
                        className="form-control" 
                        value={expiry} 
                        onChange={(event)=>{setExpiry(event.target.value)}}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={add}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
  );
}

export default checkAuth(Addmedicine);
