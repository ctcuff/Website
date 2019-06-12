import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/index.css';

function Wrapper() {
  return (
    <div>
      <Profile/>
      <About/>
      <Projects/>
      <Contact/>
    </div>
  );
}

ReactDOM.render(
  <Wrapper/>,
  document.getElementById('root')
);
