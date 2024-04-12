import React, { useContext } from 'react';
import noteContext from '../context/noteContext';

const About = () => {
  const a = useContext(noteContext); // Corrected useContext spelling
  
  return (
    <div>
     <h1>this is about {a.name}</h1>
     <h1>this is about {a.class}</h1>
    </div>
  );
}

export default About;
