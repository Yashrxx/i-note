import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
const Signup = (props) => {
    const navigate=useNavigate()
    const[Credentials,setCredentials]=useState({name:'',email:'',password:'',cpassword:''})
    const handleSubmit = async (e) => {
        e.preventDefault();
        //ApI call login
        // const {name,email,password,cpassword}=Credentials
        const {name,email,password}=Credentials
        const response = await fetch('https://i-note-7yp1.onrender.com/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password})
        })
        const json = await response.json();
        console.log(json)
        if (json.success===true){
            //redirect
            //save the auth-token
            navigate('/');
            localStorage.setItem('token',json.authToken);
            props.showalert("Account Created Successfully","success")
        }
        else{
            alert("Invalid Details","danger")
        }
    };
    const onChange=(e)=>{
        setCredentials({...Credentials,[e.target.name]:e.target.value})
    }
    return (
        <form onSubmit={handleSubmit}>
            <Col className="container" xs={12} md={6}>
            <h1 className='text-center'>Sign-up to Notebook</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name='name' id="name" onChange={onChange} aria-describedby="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' id="email" onChange={onChange} aria-describedby="email" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' id="password" onChange={onChange} minLength={5} required/>
                <div id="passwordHelp" className="form-text">We'll never share your password with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} minLength={5} required/>
            </div>
            <button type="submit" className="btn btn-primary my-1">Submit</button>
            </Col>
        </form>
    )
}

export default Signup
