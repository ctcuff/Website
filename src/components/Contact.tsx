import React, { Component } from 'react';
import { Element } from 'react-scroll';
import VisibilityObserver from './VisibilityObserver';
import emailLogo from '../static/email.svg';
import githubLogo from '../static/github.svg';
import linkedInLogo from '../static/linked-in.svg';
import resumeLogo from '../static/resume.svg';
import '../styles/Contact.scss';

const resumePdf = require('../static/resume.pdf');

type ContactState = {
  isMobile: boolean;
}

export default class Contact extends Component<{}, ContactState> {
  private readonly imgWrapper: React.RefObject<HTMLDivElement>;

  state = {
    isMobile: window.innerWidth <= 600
  };

  constructor(props: {}) {
    super(props);
    this.imgWrapper = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = (): void => {
    this.setState({ isMobile: window.innerWidth <= 600 });
  };

  onVisible = (): void => {
    const wrapper = this.imgWrapper.current;

    if (!wrapper) {
      return;
    }

    // A different screen size needs different animations so the
    // animations don't overlap
    const animations = (this.state.isMobile)
      ? ['m-slide-in-right', 'm-slide-in-down', 'm-slide-in-up', 'm-slide-in-left']
      : ['slide-in-right', 'slide-in-down', 'slide-in-up', 'slide-in-left'];

    const elements: HTMLCollection = wrapper.children;

    animations.forEach((anim, i) => {
      const img = elements[i].firstChild as HTMLImageElement;
      img.classList.add(anim);
    });
  };

  render() {
    return (
      <div className="Contact_container">
        <Element name="Contact"/>
        <VisibilityObserver className="Contact_image-container" onVisible={this.onVisible} delay={250} once>
          <div ref={this.imgWrapper}>
            <a target="_blank" href="https://github.com/ctcuff" rel="noopener noreferrer">
              <img src={githubLogo} className="Contact_img" alt="GitHub" title="GitHub"/>
            </a>
            <a href="mailto:dev.ctcuff@gmail.com" target="_blank" rel="noopener noreferrer">
              <img src={emailLogo} className="Contact_img" alt="Email" title="Email"/>
            </a>
            <a href="https://www.linkedin.com/in/cameron-cuff-126405161/" target="_blank" rel="noopener noreferrer">
              <img src={linkedInLogo} className="Contact_img" alt="linkedin" title="linkedin"/>
            </a>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer">
              <img src={resumeLogo} className="Contact_img" alt="Resume" title="Resume"/>
            </a>
          </div>
        </VisibilityObserver>
      </div>
    );
  }
}