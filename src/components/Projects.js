import React, { Component } from 'react';
import { Element } from 'react-scroll';
import { isMobile } from "react-device-detect";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VisibilityObserver from './VisibilityObserver';
import projectsJson from '../static/projects';
import '../styles/Projects.scss';

export default class Projects extends Component {

  constructor(props) {
    super(props);
    this.cardContainer = React.createRef();
    this.header = React.createRef();
  }

  onVisible = () => {
    this.header.current.classList.add('Project_header-animation');

    setTimeout(() => {
      [...this.cardContainer.current.children].forEach((card, index) => {
        setTimeout(() => card.classList.add('Project_card-animation'), index * 750);
        // Need to remove the animation afterwards so the hover effect works
        card.addEventListener('animationend', () => {
          card.style.opacity = 1;
          card.classList.remove('Project_card-animation');
        });
      });
    }, 1550);
  };

  render() {
    return (
      <VisibilityObserver onVisible={this.onVisible} once>
        <div className="Project_container" style={{ height: isMobile ? 'auto' : '100vh' }}>
          <Element name="Projects"/>
          <Row className="Project_row">
            <Col className="Project_col">
              <h1 className="Project_header display-4 text-muted" ref={this.header}>Projects</h1>
            </Col>
          </Row>
          <Row style={{ flex: 6 }} className="Project_row">
            <div className="Project_card-container" ref={this.cardContainer}>
              {projectsJson.map(project =>
                <Card className="Project_card" key={project.title}>
                  <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                    {
                      project.website_link !== null
                        ? <Card.Link href={project.website_link} target="_blank">Go to site</Card.Link>
                        : null
                    }
                    <Card.Link href={project.code_repo} target="_blank">View code</Card.Link>
                  </Card.Body>
                </Card>
              )}
            </div>
          </Row>
        </div>
      </VisibilityObserver>
    );
  }
}