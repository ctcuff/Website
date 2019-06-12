import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as Scroll from 'react-scroll';
import AnimatedSpan from './AnimatedSpan';
import '../styles/Profile.css';

export default class Profile extends Component {

  onHrefClick = (e) => {
    // Scrolls to the sections defined by the <Element/> tag
    // in the other components
    const id = e.currentTarget.getAttribute('href');
    e.preventDefault();
    Scroll.scroller.scrollTo(id, {
      duration: 2000,
      smooth: 'easeInOutQuad'
    });
  };

  render() {
    return (
      <div className="Profile_container">
        <Row className="Profile_row Profile_image-header">
          <Col className="Profile_col">
            <div style={{ padding: 16 }}>
              <Image
                width={200}
                src="https://avatars2.githubusercontent.com/u/7400747?v=4"
                className="shadow"
                roundedCircle
              />
              <h1 className="display-4 text-muted">Cameron Cuff</h1>
            </div>
          </Col>
        </Row>
        <Row style={{ flex: 4 }} className="Profile_row">
          <Col className="Profile_col Profile_col-about">
            <a href="About" className="display-4 text-muted" onClick={this.onHrefClick}>
              <AnimatedSpan>About</AnimatedSpan>
            </a>
          </Col>
          <Col className="Profile_col Profile_col-projects">
            <a href="Projects" className="display-4 text-muted" onClick={this.onHrefClick}>
              <AnimatedSpan>Projects</AnimatedSpan>
            </a>
          </Col>
          <Col className="Profile_col Profile_col-contact">
            <a href="Contact" className="display-4 text-muted" onClick={this.onHrefClick}>
              <AnimatedSpan>Contact</AnimatedSpan>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}