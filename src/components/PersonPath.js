import React from 'react';

const PersonPath = props => {
  return (
    <path
      d={props.traveledPath}
      fill="transparent"
      stroke={props.pathVisible ? 'black' : 'transparent'}
    />
  );
};

export default PersonPath;
