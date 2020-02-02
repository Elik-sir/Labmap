import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE } from 'react-svg-pan-zoom';
import LabMap from './LabMap';

const mapWidth = 1000;
const mapHeight = 600;
const MapComponent = ({ children, onMouseMove }) => {
  const [tool, setTool] = useState(TOOL_NONE);
  const [value, setValue] = useState(INITIAL_VALUE);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const Viewer = useRef();
  const targetRef = useRef();

  useEffect(() => {
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

  const changeTool = tool => setTool(tool);

  const changeValue = value => setValue(value);

  return (
    <>
      <div ref={targetRef} style={{ width: '100%', height: '100%' }}>
        <ReactSVGPanZoom
          className="qq"
          width={dimensions.width}
          height={dimensions.height}
          ref={Viewer}
          tool={tool}
          onChangeTool={tool => changeTool(tool)}
          value={value}
          onChangeValue={value => changeValue(value)}
          onMouseMove={onMouseMove}
        >
          <svg width={mapWidth} height={mapHeight}>
            <LabMap />
            {children}
          </svg>
        </ReactSVGPanZoom>
      </div>
    </>
  );
};

export default MapComponent;
