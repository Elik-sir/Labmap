import React from 'react';

const PersonCircle = props => {
  return (
    <circle
      r="22"
      cx={props.currentPosition.x}
      cy={props.currentPosition.y}
      fill="orangered"
      stroke="crimson"
      strokeWidth="5"
    />
  );
};

export default PersonCircle;
