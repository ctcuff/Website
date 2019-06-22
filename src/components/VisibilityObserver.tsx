import React, { Component } from 'react';

type ObserverProps = {
  onVisible: () => void;
  className?: string;
  delay?: number;
  once?: boolean;
};

type ObserverState = {
  visible: boolean;
  triggered: boolean;
}

/**
 * Used to determine when a Component becomes visible when scrolling
 **/
export default class VisibilityObserver extends Component<ObserverProps, ObserverState> {
  private readonly child: React.RefObject<HTMLDivElement>;

  state = {
    visible: false,
    triggered: false
  };

  constructor(props: ObserverProps) {
    super(props);
    this.child = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.isScrolledIntoView);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.isScrolledIntoView);
  }

  isScrolledIntoView = (): void => {
    const { onVisible, delay, once } = this.props;

    // Makes sure this only fires once if the once
    // prop was passed into this component
    if (this.state.triggered && once) {
      return;
    }

    const elem: (HTMLDivElement | null) = this.child.current;

    if (!elem) {
      return;
    }

    const elementBottom: number = elem.offsetTop + elem.offsetHeight;
    const viewportBottom: number = window.scrollY + window.innerHeight;
    const isVisible: boolean = elementBottom > window.scrollY && elem.offsetTop < viewportBottom;

    // Ensures this event doesn't fire a billion times
    // every time we scroll
    if (this.state.visible !== isVisible) {
      this.setState({
        triggered: true,
        visible: isVisible
      });
      setTimeout(() => onVisible(), delay || 0);
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