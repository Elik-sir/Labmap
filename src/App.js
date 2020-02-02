import React, { useState } from 'react';
import './App.css';
import PersonCircle from './components/PersonCircle';
import PersonPath from './components/PersonPath';
import MapComponent from './components/MapComponent';
import SVGLamp from './components/SVGLamp';

const App = () => {
  const [logPosition, setLogPosition] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ x: 300, y: 400 });
  const [traveledPath, setTraveledPath] = useState('');
  const [pathVisible, setPathVisible] = useState(false);
  const pushPathPointToTraveledPath = event => {
    const currentPosition = { x: event.x, y: event.y };
    setCurrentPosition(currentPosition);
    const innerLogPosition = [...logPosition, currentPosition];
    setLogPosition(innerLogPosition);
    const startPoint = 'M 100 100';
    const path = logPosition.map(pos => ' H ' + pos.x + ' V ' + pos.y);
    const traveledPath = startPoint + path;
    setTraveledPath(traveledPath);
  };
  const onPathVisibleChange = () => setPathVisible(!pathVisible);
  return (
    <>
      <div style={{ width: '45vw', height: '45vh' }}>
        <MapComponent onMouseMove={pushPathPointToTraveledPath}>
          <PersonCircle currentPosition={currentPosition} />
          <PersonPath traveledPath={traveledPath} pathVisible={pathVisible} />
        </MapComponent>
      </div>
      <input type="button" value="Путь" onClick={onPathVisibleChange} />
      <div style={{ width: '45vw', height: '45vh' }}>
        <MapComponent>
          <SVGLamp />
        </MapComponent>
      </div>
    </>
  );
};

export default App;
