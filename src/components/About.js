import React, { Component } from 'react';
import { Element } from 'react-scroll';
import VisibilityObserver from './VisibilityObserver';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../static/lightbulb.png';
import '../styles/About.scss';

export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 700,
      animationFinished: false,
    };
    this.leftSection = React.createRef();
    this.rightSection = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    this.setState({ isMobile: window.innerWidth <= 700 });
  };

  onElementVisible = () => {
    const leftSection = this.leftSection.current;
    const rightSection = this.rightSection.current;

    leftSection.classList.add('About_animate-LtoR');
    rightSection.classList.add('About_animate-RtoL');

    // When the animation finishes, set opacity for both mobile
    // and desktop to 1 so that this section doesn't
    // disappear when the page re-sizes
    leftSection.addEventListener('animationend', () => {
      this.setState({
        isMobile: this.state.isMobile,
        animationFinished: true
      })
    });
  };

  render() {
    const colStyle = {
      opacity: this.state.animationFinished ? 1 : 0
    };

    const desktop = (
      <div className="About_container">
        <Element name="About"/>
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

    const mobile = (
      <div className="About_container">
        <Element name="About"/>
        <Row className="About_row">
          <Col style={colStyle} className="About_col" ref={this.leftSection}>
            <div className="About_outer">
              <div className="About_middle">
                <div className="About_inner">
                  <h1 className="display-4 text-muted">About</h1>
                  <p className="text-muted About_p">
                    Hey there, my name is Cameron Cuff. I'm a Junior studying Computer Science at University of
                    Central Florida. I enjoy programming in Java, Python, and Javascript and I'm currently
                    learning Android development, React.js, and a bit of Flask for backend tasks.
                    In my free time, I love to play piano and clarinet.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          <Col style={colStyle} className="About_col" ref={this.rightSection}>
            <div className="About_image-wrapper">
              <div className="About_image-spacer"/>
              <img src={logo} alt="Not found" width="80%"/>
            </div>
          </Col>
        </Row>
      </div>
    );

    return (
      <VisibilityObserver onVisible={this.onElementVisible} delay={500} once>
        {this.state.isMobile ? desktop : mobile}
      </VisibilityObserver>
    );
  }
}