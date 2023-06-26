import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkAuth from "./auth/checkAuth";



function Postmedicine(props) 
{
    var user=useSelector(store=>store.auth.user)
    
    function deletemedicine() {
             
          console.log(props.medicine.id)
          var x=props.medicine.id;
        axios.delete(`https://medicalstore.mashupstack.com/api/medicine/${x}`,{headers:{'Authorization':'Bearer '+user.token}}).then(response=>{
            console.log("Server is running and accessible.");
        
            props.refresh()
        })
        .catch(error => {
            console.log("Error accessing server:", error);
          });
      
      }


    
    return( <div className="card">
    <div className="card-body">
        <p>Medicine:{props.medicine.name}</p>
        <p>company:{props.medicine.company}</p>
        <p>expiry:{props.medicine.expiry_date}</p>
       
        <button className="btn btn-primary float-right" onClick={deletemedicine}>Delete</button>
        <Link to={"posts/edit/"+props.medicine.id+'/edit'} className="btn btn-primary float-right mr-2">Edit</Link>
        <Link to={"/posts/viewPost/"+props.medicine.id} className="btn btn-primary float-right mr-2">View</Link> 
        
    </div>
</div>);
}

export default checkAuth(Postmedicine);