import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "./store/authSlice";


function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logout(){
        if(user && user.token){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
               headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="collapse navbar-collapse mr-auto"
        id="navbarNav" style={{ float: "left",color: "#ffffff" }}>
          <h4>MEDICAL STORE</h4>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
            {user?
                    <li className="nav-item">
                    <NavLink to={"/"} className={'nav-link '+
                        (status => status.isActive ? 'active' : '')
                    }>Home</NavLink></li>:null
            }
                
                <li className="nav-item">
                <NavLink to={"/Signup"} className={'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } >Signup</NavLink></li>

        {user?
                    <li className="nav-item">
                    <span className="nav-link" onClick={logout}>Logout</span>
                    </li>:<li className="nav-item">
                    <NavLink to={"/Login"} className={
                        'nav-link '+
                        (status => status.isActive ? 'active' : '')
                    }>Login</NavLink></li>
                }


            </ul>
        </div>
    </nav>;
}

export default Navbar;