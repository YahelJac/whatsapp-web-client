import ServiceServer from '../server-service';
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import './card-style.css';
import { useNavigate } from "react-router-dom";





function Register(props) {
  let navigate = useNavigate();
  const [password, setPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);
  const [userName, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvater] = useState(null);


  async function handleSubmit(event) {
    debugger;
    if (password === repeatPassword) {
      event.preventDefault();
      event.stopPropagation();
      ServiceServer.addUser(userName, password, avatar);
      ServiceServer.printAllUsers();
      props.setUser(userName);

      navigate("/chat", { replace: true });
    }


  }

  function handlePasswordChange(event) {
    const val = event.target.value;
    setPassword(val);
  }

  function handleReapeatPasswordChange(event) {
    const val = event.target.value;
    setRepeatPassword(val);
  }

  function handleUserNameChange(event) {
    const val = event.target.value;
    setName(val);

  }

  function handleEmailChange(event) {
    const val = event.target.value;
    setEmail(val);
  }

  function handleAvaterChange(event) {
    const val = URL.createObjectURL(event.target.files[0]);
    console.log(val);
    setAvater(val);
  }


  return (
    <div className="Register">
      <Card id="card-style">

        <Container style={{ width: "60%" }}>

          <Form onSubmit={event => handleSubmit(event)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>User Name</Form.Label>
              <Form.Control required type="text" placeholder="User Name"
                onChange={event => handleUserNameChange(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Email address"
                onChange={event => handleEmailChange(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password"
                onChange={event => handlePasswordChange(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control required type="password" placeholder="Repeat Password"
                onChange={event => handleReapeatPasswordChange(event)}
              />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              

              <Form.Label>upload photo</Form.Label>
              <br></br>
              <input type="file" accept="image/*" className="custom-file-input" id="inputGroupFile01" onChange={event => handleAvaterChange(event)}></input>


            </Form.Group>

            <Button className="btn btn-secondary" type="submit">
              Submit
            </Button>
          </Form>

        </Container>

      </Card>
    </div>
  );
}

export default Register;
