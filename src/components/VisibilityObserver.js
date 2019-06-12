import React, { Component } from 'react';

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
    window.addEventListener('scroll', this.isScrolledIntoView);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.isScrolledIntoView);
  }

  isScrolledIntoView = () => {
    // Makes sure this event only fires when the element
    // comes into view for the first time
    if (this.state.triggered) {
      return;
    }

    const { watchId, onVisible } = this.props;
    const elem = document.getElementById(watchId);

    if (!elem) {
      console.error(`Element ${watchId} was not found`);
      return;
    }

    const elementBottom = elem.offsetTop + elem.offsetHeight;
    const viewportBottom = window.scrollY + window.innerHeight;
    const isVisible = elementBottom > window.scrollY && elem.offsetTop < viewportBottom;

    // Ensures this event doesn't fire a billion times
    // every time we scroll
    if (this.state.visible !== isVisible) {
      this.setState({ triggered: true });
      setTimeout(onVisible, this.props.delay || 0);
    }
  };

  render() {
    return <div>{this.props.children}</div>
  }
}