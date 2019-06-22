import React, { Component } from 'react';
import { Element } from 'react-scroll';
import VisibilityObserver from './VisibilityObserver';
import logo from '../static/lightbulb.png';
import '../styles/About.scss';

type AboutState = {
  isMobile: boolean;
  animationFinished: boolean;
}

export default class About extends Component<{}, AboutState> {
  private readonly leftSection: React.RefObject<HTMLDivElement>;
  private readonly rightSection: React.RefObject<HTMLDivElement>;

  state = {
    isMobile: window.innerWidth <= 700,
    animationFinished: false
  };

  constructor(props: {}) {
    super(props);
    this.leftSection = React.createRef();
    this.rightSection = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = (): void => {
    this.setState({ isMobile: window.innerWidth <= 700 });
  };

  onElementVisible = (): void => {
    const leftSection = this.leftSection.current;
    const rightSection = this.rightSection.current;

    if (!leftSection || !rightSection) {
      return;
    }

    leftSection.classList.add('About_animate-LtoR');
    rightSection.classList.add('About_animate-RtoL');

    this.setState({ animationFinished: true });
  };

  render() {
    const mobile = (
      <div className="About_container">
        <div
          ref={this.leftSection}
          style={{
            flex: 1,
            opacity: this.state.animationFinished ? 1 : 0,
            margin: '16px'
          }}
        >
          <h1 className="display-4 text-muted">About</h1>
          <p className="text-muted About_p">
            Hey there, my name is Cameron Cuff. I'm a Junior studying Computer Science at the University of
            Central Florida. I enjoy programming in Java, Python, and Javascript and I'm currently
            learning Android development, React.js, and a bit of Flask for backend tasks.
            In my free time, I love to play piano and clarinet.
          </p>
        </div>
        <div
          ref={this.rightSection}
          style={{
            flex: 1,
            opacity: this.state.animationFinished ? 1 : 0
          }}
        >
          <div className="About_image-wrapper">
            <div className="About_image-spacer"/>
            <img src={logo} alt="Not found" width="65%"/>
          </div>
        </div>
      </div>
    );

    const desktop = (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div ref={this.leftSection} style={{ flex: 1, }}>
          <div
            style={{
              opacity: this.state.animationFinished ? 1 : 0,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
              paddingLeft: '5%'
            }}
          >
            <h1 className="display-4 text-muted">About</h1>
            <p className="text-muted About_p">
              Hey there, my name is Cameron Cuff. I'm a Junior studying Computer Science at the
              University of Central Florida. I enjoy programming in Java, Python, and Javascript
              and I'm currently learning Android development, React.js, and a bit of Flask for
              backend tasks. In my free time, I love to play piano and clarinet.
            </p>
          </div>
        </div>
        <div ref={this.rightSection} style={{ flex: 1, opacity: this.state.animationFinished ? 1 : 0 }}>
          <div className="About_image-wrapper">
            <div className="About_image-spacer"/>
            <img src={logo} alt="Not found" width="80%"/>
          </div>
        </div>
      </div>
    );

    return (
      <VisibilityObserver onVisible={this.onElementVisible} delay={500} once>
        <Element name="About"/>
        {this.state.isMobile ? mobile : desktop}
      </VisibilityObserver>
    );
  }
}