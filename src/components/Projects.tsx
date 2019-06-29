import React, { Component } from 'react';
import { Element } from 'react-scroll';
import { isMobile } from "react-device-detect";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VisibilityObserver from './VisibilityObserver';
import '../styles/Projects.scss';

type Project = {
  title: string;
  description: string;
  codeRepo: string;
  websiteLink?: string;
}

const projectsJson: Project[] = require('../static/projects.json');

export default class Projects extends Component {
  private readonly cardContainer: React.RefObject<HTMLDivElement>;
  private readonly header: React.RefObject<HTMLHeadingElement>;

  constructor(props: {}) {
    super(props);
    this.cardContainer = React.createRef();
    this.header = React.createRef();
  }

  onVisible = (): void => {
    const header = this.header.current;

    if (!header) {
      return;
    }

    header.classList.add('Project_header-animation');

    setTimeout(() => {
      const container = this.cardContainer.current;

      if (!container) {
        return;
      }

      Array.prototype.forEach.call(container.children, (card: HTMLDivElement, index: number) => {
        setTimeout(() => card.classList.add('Project_card-animation'), index * 750);

        // Need to remove the animation afterwards so the hover effect works
        card.addEventListener('animationend', () => {
          card.style.opacity = '1';
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
                      project.websiteLink !== null
                        ? <Card.Link href={project.websiteLink} target="_blank">Go to site</Card.Link>
                        : null
                    }
                    <Card.Link href={project.websiteLink || ""} target="_blank">View code</Card.Link>
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