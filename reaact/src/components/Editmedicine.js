import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";
import Navbar from "./Navbar";
import checkAuth from "./auth/checkAuth";


function EditPost()
 {
    const { postId } = useParams();
    var user=useSelector(store=>store.auth.user)
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry, setExpiry] = useState('');
    var navigate = useNavigate()

    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId,
        {headers:{'Authorization':'Bearer '+user.token}}).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry(response.data.expiry_date);
        
        })

    },[postId,user.token]);
    
    function updatePost()
    {
         axios.post('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
                name: name,
                company: company,
                expiry_date:expiry
            },{headers:{'Authorization':'Bearer '+user.token}}).then(response=>{
                navigate('/')
            })
    }
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Edit Post</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name || ''} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input
                        type="text"
                        className="form-control" 
                        value={company || ''} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>ExpiryDate:</label>
                        <input type="date" 
                        className="form-control" 
                        value={expiry || ''} 
                        onChange={(event)=>{setExpiry(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={updatePost}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}


export default checkAuth(EditPost);