import React from 'react';
import { Element } from 'react-scroll';
import { isMobile } from "react-device-detect";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Projects.scss';
import projectsJson from '../static/projects';

export default function Projects() {
  // noinspection JSUnresolvedVariable, JSUnresolvedFunction
  return (
    <div className="Project_container" style={{ height: isMobile ? 'auto' : '100vh' }}>
      <Element name="Projects"/>
      <Row className="Project_row">
        <Col className="Project_col">
          <h1 className="Project_header display-4 text-muted">Projects</h1>
        </Col>
      </Row>
      <Row style={{ flex: 6 }} className="Project_row">
        <div className="Project_card-container">
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
  );
}