import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE } from 'react-svg-pan-zoom';
import LabMap from './LabMap';
import PersonCircle from './PersonCircle';
import PersonPath from './PersonPath';

const MapComponent = props => {
  const [currentPosition, setCurrentPosition] = useState({ x: 300, y: 400 });
  const [logPosition, setLogPosition] = useState([]);
  const [traveledPath, setTraveledPath] = useState('');
  const [tool, setTool] = useState(TOOL_NONE);
  const [value, setValue] = useState(INITIAL_VALUE);
  const [pathVisible, setPathVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const Viewer = useRef();
  const targetRef = useRef();
  useEffect(() => {
    // Viewer.fitToViewer();
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
    const handleResize = () => {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    };
    window.addEventListener('resize', handleResize);
  }, [Viewer]);

  // const onPathVisibleChange = () => setPathVisible(!pathVisible);

  const changeTool = tool => setTool(tool);

  const changeValue = value => setValue(value);

  const onClickHandler = event => {
    //TODO: add this later
  };
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

  return (
    <>
      <div ref={targetRef} style={{ width: '100vw', height: '100vh' }}>
        <ReactSVGPanZoom
          className="qq"
          width={dimensions.width}
          height={dimensions.height}
          ref={Viewer}
          tool={tool}
          onChangeTool={tool => changeTool(tool)}
          value={value}
          onChangeValue={value => changeValue(value)}
          onClick={onClickHandler}
          onMouseMove={e => pushPathPointToTraveledPath(e)}
        >
          <svg width={1000} height={600}>
            <LabMap />
            <PersonCircle currentPosition={currentPosition} />
            <PersonPath traveledPath={traveledPath} pathVisible={pathVisible} />
          </svg>
        </ReactSVGPanZoom>
        {/* <input type="button" value="Путь" onClick={onPathVisibleChange} /> */}
      </div>
    </>
  );
};

export default MapComponent;
