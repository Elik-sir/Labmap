import React from 'react';

const SVGLamp = props => {
  return (
    <circle
      r="22"
      cx={300}
      cy={300}
      fill="blue"
      stroke="blue"
      strokeWidth="5"
      onClick={props.onClick}
    />
  );
};

export default SVGLamp;
