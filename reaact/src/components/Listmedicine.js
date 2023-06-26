import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import checkAuth from "./auth/checkAuth";
import Postmedicine from "./Postmedicine"


function Listmedicine() {
    var [medicine, setMedicine]=useState([]);
    var user=useSelector(store=>store.auth.user)
    function fetchMedicine(){
        axios.get('https://medicalstore.mashupstack.com/api/medicine',
        {headers:{'Authorization':'Bearer '+user.token}}
        ).then(response=>{
            setMedicine(response.data)
        })

    }
    useEffect(()=>{
        fetchMedicine()
    },[]);

    return (<div>
       
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-4">LIST MEDICINE</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    <Link to="/post/create" className="btn btn-info mb-2" >ADD MEDICINE</Link>&nbsp;&nbsp;
                    <Link to="/posts/search" className="btn btn-info mb-2">SEARCH MEDICINE</Link>&nbsp;&nbsp;
                        {medicine.map(medicine=><Postmedicine key={medicine.id} medicine={medicine} refresh={fetchMedicine}/>)}
                    
                </div>
            </div>
        </div>
    </div>)
}
export default checkAuth(Listmedicine);
