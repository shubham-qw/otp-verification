import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [cred,setCred] = useState({mobile : "",password : ""});
    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/loginuser", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({mobile : cred.mobile, password : cred.password})
        });

        const json = await  response.json();


        if (json.success) {
            navigate("/login");
        }
        else {
            alert(json.msg);
        }

    }
    function onChange(e) {
        setCred({...cred,[e.target.name] : e.target.value});
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} className="container w-25" style={{marginTop: "100px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter number" onChange={onChange} name="mobile" value={cred.mobile}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  onChange={onChange}name="password" value={cred.password}/>
                </Form.Group>
                <Button variant="primary" className="mb-1" type="submit">
                    Submit
                </Button>
                <Link className="btn btn-primary mx-2" to="/signup">New user</Link>
            </Form>
        </div>
    )
}

export default Login;