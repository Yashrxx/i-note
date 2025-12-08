import React, { useState } from 'react';
import { Form , Container, Row, Col } from 'react-bootstrap';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
const Login = (props) => {
    // const{showalert}=props;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        //ApI call login
        const response = await fetch('https://i-note-7yp1.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json();
        console.log(json)
        if (json.success === true) {
            //redirect
            //save the auth-token
            navigate('/');
            localStorage.setItem('token', json.authToken);
            props.showalert("Successfully Loged in", "success");
            setLoading(false);
        }
        else {
            props.showalert("Invalid Credentials", "danger");
            setLoading(false);
        }
        // console.log("login credentials added successfully")
        // console.log('Login attempted with:', { email, password });
        // Here you would typically send a request to your server
    };
    return (
        <Fragment>
            <div id="login" >
                <div className="container-x">
                    <section >
                        <Container>
                            <Row style={{ justifyContent: "space-evenly", alignItems: "center", alignContent: "center" }}>
                                <Col xs={12} md={6}>
                                    <h1 className="text-center mb-4">Login to Notebook</h1>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="justify-content-md-center  mb-3" controlId="formBasicEmail">
                                            <Form.Label >Email address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className=" mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                {loading ? "Submitting..." : "Submit"}
                                            </button>
                                        </div>
                                        {loading ? <div style={{ marginTop: '10px' }}><h6 style={{ display: 'flex', justifyContent: "center" }}>This may take a few seconds due to hosting on free services of github</h6></div> : ""}
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>
            </div>
        </Fragment>
    )
}

export default Login
