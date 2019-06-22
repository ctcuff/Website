import React from 'react';
import '../styles/AnimatedSpan.scss';

type SpanProps = {
  children?: any;
}

export default function AnimatedSpan(props: SpanProps) {
  return <span className="AnimatedSpan">{props.children}</span>;
}