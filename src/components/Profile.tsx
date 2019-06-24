import React from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { isMobile } from "react-device-detect";
import { scroller } from 'react-scroll';
import AnimatedSpan from './AnimatedSpan';
import '../styles/Profile.scss';

export default function Profile() {

  const onHrefClick = (e: React.MouseEvent): void => {
    // Scrolls to the sections defined by the <Element/> tag
    // in the other components
    const id = e.currentTarget!.getAttribute('href') as string;
    e.preventDefault();
    scroller.scrollTo(id, {
      duration: 2000,
      smooth: 'easeInOutQuad'
    });
  };

  return (
    <div className="Profile_container">
      <Row className="Profile_row Profile_image-header">
        <Col className="Profile_col">
          <div style={{ padding: 16 }}>
            <Image
              width={isMobile ? 150 : 200}
              src="https://avatars2.githubusercontent.com/u/7400747?v=4"
              className="shadow Profile_image"
              alt="Profile image"
              roundedCircle
            />
            <h1 className="display-4 text-muted">Cameron Cuff</h1>
          </div>
        </Col>
      </Row>
      <Row style={{ flex: 4 }} className="Profile_row">
        <Col className="Profile_col Profile_col-about">
          <a href="About" className="display-4 text-muted" onClick={onHrefClick}>
            <AnimatedSpan>About</AnimatedSpan>
          </a>
        </Col>
        <Col className="Profile_col Profile_col-projects">
          <a href="Projects" className="display-4 text-muted" onClick={onHrefClick}>
            <AnimatedSpan>Projects</AnimatedSpan>
          </a>
        </Col>
        <Col className="Profile_col Profile_col-contact">
          <a href="Contact" className="display-4 text-muted" onClick={onHrefClick}>
            <AnimatedSpan>Contact</AnimatedSpan>
          </a>
        </Col>
      </Row>
    </div>
  );
}