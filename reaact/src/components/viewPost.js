import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar";
import checkAuth from "./auth/checkAuth";

function ViewPost() {
    var user=useSelector(store=>store.auth.user)
    const { postId } = useParams();
    const [post, setPost] = useState({ name: '', company: '', expiry_date: '' });
  
    useEffect(() => {
      axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`,{headers:{'Authorization':'Bearer '+user.token}})
        .then(response => setPost(response.data))
        .catch(error => console.error(error));
    }, [postId]);
  
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header"><h3>View</h3></div>
                        <div className="card-body"><h3>Name: {post.name}</h3>
                            <h3>Company: {post.company}</h3>
                            <h3>Expiry Date: {post.expiry_date}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(ViewPost);