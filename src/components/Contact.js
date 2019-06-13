import React, { Component } from 'react';
import { Element } from 'react-scroll';
import VisibilityObserver from './VisibilityObserver';
import Image from 'react-bootstrap/Image';
import emailLogo from '../static/email.png';
import githubLogo from '../static/github.png';
import linkedInLogo from '../static/linked-in.png';
import resumeLogo from '../static/resume.png';
import resumePdf from '../static/resume.pdf';
import '../styles/Contact.css';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: window.innerWidth <= 600 };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    this.setState({ isMobile: window.innerWidth <= 600 });
  };

  onVisible = () => {
    // A different screen size needs different animations so the
    // animations don't overlap
    const animations = (this.state.isMobile)
      ? ['m-slide-in-right', 'm-slide-in-down', 'm-slide-in-up', 'm-slide-in-left']
      : ['slide-in-right', 'slide-in-down', 'slide-in-up', 'slide-in-left'];

    const elements = document.getElementById('img-wrapper').children;

    animations.forEach((anim, i) => {
      // Applies the animation to the <Image/> tag
      elements[i].firstElementChild.classList.add(anim);
    });
  };

  render() {
    return (
      <div className="Contact_container" id="contact-container">
        <Element name="Contact"/>
        <VisibilityObserver className="Contact_image-container" onVisible={this.onVisible}  delay={250} once>
          <div id="img-wrapper">
            <a target="_blank" href="https://github.com/ctcuff" rel="noopener noreferrer">
              <Image src={githubLogo} className="Contact_img"/>
            </a>
            <a href="mailto:dev.ctcuff@gmail.com" target="_blank" rel="noopener noreferrer">
              <Image src={emailLogo} className="Contact_img"/>
            </a>
            <a href="https://www.linkedin.com/in/cameron-cuff-126405161/" target="_blank" rel="noopener noreferrer">
              <Image src={linkedInLogo} className="Contact_img"/>
            </a>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer">
              <Image src={resumeLogo} className="Contact_img"/>
            </a>
          </div>
        </VisibilityObserver>
      </div>
    );
  }
}