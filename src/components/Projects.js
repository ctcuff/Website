import React, { Component } from 'react';
import { Element } from 'react-scroll';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Projects.css';

export default class Projects extends Component {

  constructor(props) {
    super(props);
    this.state = { isMobile: window.innerWidth <= 770 };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => {
    this.setState({ isMobile: window.innerWidth <= 770 });
  };

  render() {
    return (
      <div className="Project_container">
        <Element name="Projects"/>
        <Row className="Project_row">
          <Col className="Project_col">
            <h1 className="Project_header display-4 text-muted">Projects</h1>
          </Col>
        </Row>
        <Row style={{ flex: 6 }} className="Project_row">
          <div className="Project_card-container">
            <Card className="Project_card">
              <Card.Body>
                <Card.Title>Tweet-Tracker</Card.Title>
                <Card.Text>
                  A website to track the occurrences of a given keyword on Twitter in real time.
                  This project was built using Python (Flask) as a backend, and React.js
                  and Javascript in the frontend.
                </Card.Text>
                <Card.Link href="https://tweeter-tracker.herokuapp.com/" target="_blank">Go to site</Card.Link>
                <Card.Link href="https://github.com/ctcuff/Tweet-Tracker" target="_blank">View code</Card.Link>
              </Card.Body>
            </Card>
            <Card className="Project_card">
              <Card.Body>
                <Card.Title>UCFParking</Card.Title>
                <Card.Text>
                  This is an API and website that tracks how full each parking garage is.
                  Every hour, a scrapper scraps UCF's parking site and saves it to an online
                  database. The backend was created using Python (Flask, again) and the frontend
                  utilizes Javascript and jQuery.
                </Card.Text>
                <Card.Link href="https://ucfparking.herokuapp.com/" target="_blank">Go to site</Card.Link>
                <Card.Link href="https://github.com/ctcuff/UCFParking-Web" target="_blank">View code</Card.Link>
              </Card.Body>
            </Card>
            <Card className="Project_card">
              <Card.Body>
                <Card.Title>MotionPy</Card.Title>
                <Card.Text>
                  A motion detection system using a Raspberry Pi 3, camera module, breadboard,
                  some paper clips and a top-of-the-line cardboard box. A Python server
                  (surprise surprise, it's Flask again) running on the Raspberry Pi sends an
                  Android app, written in Java and Kotlin, a notification and a picture when movement
                  is detected. Images are saved online via Firebase.
                </Card.Text>
                <Card.Link href="https://github.com/ctcuff/MotionPy" target="_blank">View code</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </Row>
      </div>
    );
  }
}