import React from "react";
import { useSpring, animated } from "react-spring";
import {
  fitSelection,
  fitToViewer,
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  zoomOnViewerCenter
} from "react-svg-pan-zoom";
const viewBox = ["0 0 1200 1000"];

/*function A(props) {
  const props1 = useSpring({
    to: { opacity: props.toggle },
    from: { opacity: 0 }
  });
  var x = props.x;
  const z = () =>
    (document.getElementById("5").style.transform =
      "scale(" + props.zoom + ")");
  if (x <= 64) x = 64 + 22;
  return (
    <div>
      <ReactSVGPanZoom
        width={500}
        height={500}
        ref={Viewer => (this.Viewer = Viewer)}
        tool={this.state.tool}
        onChangeTool={tool => this.changeTool(tool)}
        value={this.state.value}
        onChangeValue={value => this.changeValue(value)}
        onZoom={e => console.log("zoom")}
        onPan={e => console.log("pan")}
        onClick={event =>
          console.log("click", event.x, event.y, event.originalEvent)
        }
      >
        <svg viewBox={viewBox} id="5">
          <g fillOpacity=".5" strokeWidth="4">
            <path
              d="M 10 10 H 90 V 66 H 64 V 529 H 139 V 545 H 292 V 529 H 445 V 545 H 600 V 529 H 731 V 545 
         H 888 V 529 H 938 V 62 H 840 V 10 H 750 V 62 H 480 V 10 H 390 V 62 H 203 V 38 H 189 V 10 "
              fill="transparent"
              stroke="black"
              /*style={{
            transform: "scale(" + props.zoom + ")"
          }}
            />
            <circle
              style={props1}
              r="22"
              cx={x}
              cy={props.y}
              fill="orangered"
              stroke="crimson"
              strokeWidth="5"
            />
          </g>
          <animated.path
            d={props.way}
            fill="transparent"
            stroke="black"
            style={props1}
          />
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
}*/

export default A;
