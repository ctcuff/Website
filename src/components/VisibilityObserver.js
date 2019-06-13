import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Used to determine when a Component becomes visible when scrolling
 **/
export default class VisibilityObserver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      triggered: false
    };
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    window.addEventListener('scroll', this.isScrolledIntoView);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.isScrolledIntoView);
  }

  isScrolledIntoView = () => {
    // Makes sure this only fires once if the once
    // prop was passed into this component
    if (this.state.triggered && this.props.once) {
      return;
    }

    const { onVisible, delay } = this.props;
    const elem = this.node;

    if (!elem) {
      console.error(`Element was not found`);
      return;
    }

    const elementBottom = elem.offsetTop + elem.offsetHeight;
    const viewportBottom = window.scrollY + window.innerHeight;
    const isVisible = elementBottom > window.scrollY && elem.offsetTop < viewportBottom;

    // Ensures this event doesn't fire a billion times
    // every time we scroll
    if (this.state.visible !== isVisible) {
      this.setState({
        triggered: true,
        visible: isVisible
      });
      setTimeout(() => onVisible(isVisible), delay || 0);
    }
  };

  render() {
    return (
      <div className={this.props.className} id={this.props.id}>
        {this.props.children}
      </div>
    );
  }
}