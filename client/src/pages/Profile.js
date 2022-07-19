// DO NOT TOUCH DREW IS WORKING ON

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Navigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_PROFILE, QUERY_USER_PLAYERS } from "../utils/queries";
import { NEW_PLAYER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Card, Form, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import ProfilePlayers from "../components/ProfilePlayers";
Modal.setAppElement("#root");

export default function Profile() {
  // Modal Logic
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(!open);
  }

  // New Player Form Logic
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    number: null,
    position: [],
    handedness: "",
  });
  const [newPlayer, { playerError, playerData }] = useMutation(NEW_PLAYER);
  const handleChange = (event) => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "number") {
      newValue = parseInt(value);
      console.log(typeof newValue);
    }

    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await newPlayer({
          variables: { ...formState },
        });
    } catch (e) {
        console.error(e);
    }
};

// Get Profile Data Logic
const { loading, error, data } = useQuery(QUERY_PROFILE);
if (error) {
    console.log(error);
}

// Player List
const [playerInfo, setPlayerInfo] = useState({})

// useEffect(() => {
//   const { loadingPlayer, userPlayers } = useQuery(QUERY_USER_PLAYERS)
//   .then(playerData => setPlayerInfo(playerData));
// }, [])

// console.log('---playerData---')
// console.log(playerInfo)

if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div>
        <h4>
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </h4>
      </div>
    );
  }
  const user = data.user;
  const useLogout = () => {
    Auth.logout();
  };



  return (
    <main>
      <div>
        <h2>Welcome, {user.first_name}!</h2>
        <button onClick={() => openModal()}>Create a new player</button>
        <Button onClick={useLogout}>Logout</Button>
        <Modal
          isOpen={open}
          onRequestClose={() => openModal()}
          contentLabel="New Player"
        >      <Card style={{ padding: 30 }}>
        {" "}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="first_name"
              type="first_name"
              placeholder="Enter First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="last_name"
              type="last_name"
              placeholder="Enter Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Number</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="number"
              type="number"
              placeholder="Enter Player Number"
            />

          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="position"
              type="position"
              placeholder="Enter position"
            />
          </Form.Group>
                    <Form.Group className="mb-3">
          <Form.Label>Handedness</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="handedness"
              type="handedness"
              placeholder="Enter Handedness"
            />
          </Form.Group>
          <Row className="justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Link style={{ padding: 15 }} to="/login">
            Already have an account? Login!
          </Link>
        </Row>
      </Card>
    </Modal>
    <div>
        <ul>
                <ProfilePlayers/>
        </ul>
    </div>
      </div>
    </main>
  );
}
