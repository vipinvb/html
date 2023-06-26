import axios from 'axios'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { setUser } from '../store/authSlice';


const Login = () => {
    
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[errorMessage,setErrorMessage] = useState('');
    const handleemail=(e)=>{setemail(e.target.value)}
    const handlepassword=(e)=>{setpassword(e.target.value)}
   const dispatch = useDispatch();
   const navigate=useNavigate();

    const click=()=>
 {
    
    axios.post('https://medicalstore.mashupstack.com/api/login',{
      email:email,
      password:password
    }).then(result=>{
      setErrorMessage('')

      var user = {
        email:email,
        token:result.data.token
       }

     
      dispatch(setUser(user));
      navigate('/');

    })
    .catch(error=>{
      if(error.response.data.errors){
          setErrorMessage(Object.values(error.response.data.errors).join(' '))
      }else if(error.response.data.message){
          setErrorMessage(error.response.data.message)
      }else{
          setErrorMessage('Failed to login user. Please contact admin')
      }
      })
  }


  return (
    <div>
      <Navbar/>
      <div  className="container">
        <div className='row'>
          <div className='col-8 offset-2'>
            <h1>MEDICAL STORE</h1><br/><br/>
            <h2>LOGIN</h2>
            {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
            <div className='form-group'>
            <label htmlFor="">Email: </label>
            <input className='form-control' type="text" value={email} onChange={handleemail}/>
            </div><br/>
            <div className='form-group'>
            <label htmlFor="">Password: </label>
            <input className='form-control' type="password" value={password} onChange={handlepassword}/>
            </div><br/>
            <div className='form-group'>
              <button className="btn btn-primary float-right" onClick={click}>LOG IN</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  
    
  )
}

export default Login;