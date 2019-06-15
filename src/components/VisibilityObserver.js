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
    this.child = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.isScrolledIntoView);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.isScrolledIntoView);
  }

  isScrolledIntoView = () => {
    const { onVisible, delay, once } = this.props;

    // Makes sure this only fires once if the once
    // prop was passed into this component
    if (this.state.triggered && once) {
      return;
    }

    const elem = this.child.current;
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
      <div className={this.props.className} ref={this.child}>
        {this.props.children}
      </div>
    );
  }
}