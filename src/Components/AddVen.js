import React from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';


export default class AddVen extends React.Component {
    state = {
        name: '',
        phoneNumber: '',
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    sendData = () => {
        fetch('../../query/addven', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(data => {
                if (data === "INVALID") {
                    // Sent the state's message
                    console.log(data)
                    this.setState({ message: "Missing data" })
                }
                else {
                    // Set the global state to true
                    console.log(data)
                    window.alert("The Vendor has been Successfully Added!")
                    this.props.history.push('/adminpage/addven')
                }
            })
            .catch((error) => {
                this.setState({ message: "Unable to connect to the server at this time" })
            })
    }

    onSubmit = e => {
        e.preventDefault();
        console.log("Comp got: ", this.state);
        this.sendData();
    };

    render() {
        return (
            <Container style={{ marginBottom: "50px", marginTop: "20px" }}>
                <Card style={{ width: '50%', margin: '0 auto', }}>
                    <Card.Header>Add Vendor</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" value={this.state.name} onChange={e => this.change(e)} type="text" placeholder="Name" />
                            </Form.Group>
                            <Form.Group controlId="ControlInput2">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control name="phoneNumber" value={this.state.phoneNumber} onChange={e => this.change(e)} type="number" placeholder="Phone Number" />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={e => this.onSubmit(e)}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );

    }

}