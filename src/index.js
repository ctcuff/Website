import React from 'react';
import ReactDOM from 'react-dom';
import { isMobile } from "react-device-detect";
import Profile from './components/Profile';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/index.scss';

function Spacer() {
  const margin = isMobile ? '30vh' : '32px';
  return (
    <div
      style={{
        marginTop: margin,
        marginBottom: margin
      }}
    />
  );
}

function Wrapper() {
  return (
    <div>
      <Profile/>
      <Spacer/>
      <About/>
      <Spacer/>
      <Projects/>
      <Spacer/>
      <Contact/>
    </div>
  );
}

ReactDOM.render(
  <Wrapper/>,
  document.getElementById('root')
);
