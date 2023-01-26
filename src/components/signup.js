import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [cred, setCred] = useState({ mobile: "", password: "" });
    const [OTP,setOTP] = useState("");
    const [genOTP, setgenOTP] = useState("");
    const [checkSubmit, setSubmit] = useState(true);
    const [verify, setVerify] = useState(false);
    const [change,setChange] = useState("Send OTP");
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!checkSubmit) {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cred)
            });

            const json = await response.json();

            if (json.success) {
                navigate("/");
            }
        }
        else {
            const response = await fetch("http://localhost:5000/api/verifyuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mobile: cred.mobile, password: cred.password })
            });

            const json = await response.json();
            if (json.success) {
            setgenOTP(json.otp);
            setVerify(true);
            alert(json.otp);
            }
            else {
                console.log(json);
                alert(json.msg);
            }
        }
    }
    function onChange(e) {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }
    function OTPchange(e) {
        setOTP(e.target.value);
    }
    function checkOTP() {
        if (genOTP === OTP) {
        setVerify(false);
        setSubmit(false);
        setChange("Submit");
        }
        else {
            alert("Wrong OTP");
        }
    }
    return (
        <div>
            <Form onSubmit={handleSubmit} className="container w-25" style={{ marginTop: "100px" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter number" onChange={onChange} name="mobile" value={cred.mobile} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={onChange} name="password" value={cred.password} />
                </Form.Group>
                {
                    verify ? <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Enter OTP" onChange={OTPchange}/>
                        <Button className="mt-1" variant="info" type="button" onClick={checkOTP} value={OTP} >
                            verify no.
                        </Button>
                    </Form.Group> : ""
                }
                <Button variant="primary" className="mb-1" type="submit">
                    {change}
                </Button>
                <Link className="btn btn-primary mx-2" to="/">Already a user</Link>
            </Form>
        </div>
    );
}

export default Signup;