import React from 'react';
import {
  fitSelection,
  fitToViewer,
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  zoomOnViewerCenter,
} from 'react-svg-pan-zoom';

export default class App extends React.PureComponent {
  state = {
    currentPosition: { x: 300, y: 400 },
    logPosition: [],
    traveledPath: '',
    d: 0,
    tool: TOOL_NONE,
    value: INITIAL_VALUE,
  };
  Viewer = null;

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  changeTool(tool) {
    this.setState({ tool });
  }

  changeValue(value) {
    this.setState({ value });
  }

  fitToViewer_1() {
    this.setState(state => ({ value: fitToViewer(state.value) }));
  }

  fitToViewer_2() {
    this.Viewer.fitToViewer();
  }

  fitSelection_1() {
    this.setState(state => ({
      value: fitSelection(state.value, 40, 40, 200, 200),
    }));
  }

  fitSelection_2() {
    this.Viewer.fitSelection(40, 40, 200, 200);
  }

  zoomOnViewerCenter_1() {
    this.setState(state => ({ value: zoomOnViewerCenter(state.value, 1.1) }));
  }

  zoomOnViewerCenter_2() {
    this.Viewer.zoomOnViewerCenter(1.1);
  }

  qwe = event => {
    const currentPosition = { x: event.x, y: event.y };
    this.setState({ currentPosition });
    const logPosition = [...this.state.logPosition, this.state.currentPosition];
    this.setState({ logPosition });
    const startPoint = 'M 100 100';
    const path = this.state.logPosition.map(
      pos => ' H ' + pos.x + ' V ' + pos.y
    );
    const traveledPath = startPoint + path;
    this.setState({ traveledPath });
    console.log(this.state.logPosition);
  };

  render() {
    return (
      <div>
        {/* <button className="btn" onClick={() => this.zoomOnViewerCenter_1()}>
          Zoom in
        </button>
        <button className="btn" onClick={() => this.fitSelection_1()}>
          Zoom area 200x200
        </button>
        <button className="btn" onClick={() => this.fitToViewer_1()}>
          Fit
        </button>

        <strong>OR</strong>
        {/* keep attention in this way onZoom and onPan cb aren't called */}
        {/* <button className="btn" onClick={() => this.zoomOnViewerCenter_2()}>
          Zoom in
        </button>
        <button className="btn" onClick={() => this.fitSelection_2()}>
          Zoom area 200x200
        </button>
        {/* <button className="btn" onClick={() => this.fitToViewer_2()}>
          Fit
        </button> */}

        {/* <hr /> */}

        <ReactSVGPanZoom
          width={1000}
          height={600}
          ref={Viewer => (this.Viewer = Viewer)}
          tool={this.state.tool}
          onChangeTool={tool => this.changeTool(tool)}
          value={this.state.value}
          onChangeValue={value => this.changeValue(value)}
          onZoom={e => console.log('zoom')}
          onPan={e => console.log('pan')}
          onClick={event =>
            console.log('click', event.x, event.y, event.originalEvent)
          }
          onMouseMove={e => this.qwe(e)}
        >
          <svg width={1000} height={600} onMouseMove={this.qwe}>
            {' '}
            {/* or <svg viewBox="0 0 617 316" */}
            <g fillOpacity=".5" strokeWidth="4">
              <path
                d="M 10 10 H 90 V 66 H 64 V 529 H 139 V 545 H 292 V 529 H 445 V 545 H 600 V 529 H 731 V 545 
         H 888 V 529 H 938 V 62 H 840 V 10 H 750 V 62 H 480 V 10 H 390 V 62 H 203 V 38 H 189 V 10 "
                fill="transparent"
                stroke="black"
              />
              <circle
                r="22"
                cx={this.state.currentPosition.x}
                cy={this.state.currentPosition.y}
                fill="orangered"
                stroke="crimson"
                strokeWidth="5"
              />
            </g>
            <path
              d={this.state.traveledPath}
              fill="transparent"
              stroke="black"
            />
          </svg>
        </ReactSVGPanZoom>
        <input type="button" value="Путь" onClick={this.hand} />
      </div>
    );
  }
}

/*import React, { Component } from "react";
//import A from "./a";
import { useSpring, animated } from "react-spring";
var scale = 1;
const viewBox = ["0 0 1200 1000"];
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPosition: { x: 5, y: 100 },
      logPosition: [],
      traveledPath: "",
      showPath: 0,
      d: 0,
    };
  }
 
  toggle = e => this.setState({ showPath: this.state.showPath === 1 ? 0 : 1 });
  qwe = e => {
    const currentPosition = { x: e.screenX, y: e.screenY };
    this.setState({ currentPosition });
    const logPosition = [...this.state.logPosition, this.state.currentPosition];
    this.setState({ logPosition });
    const startPoint = "M 100 100";
    const path = this.state.logPosition.map(
      pos => " H " + pos.x + " V " + pos.y
    );
    const traveledPath = startPoint + path;
    this.setState({ traveledPath });
  };
  render() {
    return (
      <div
        onMouseMove={this.qwe}
        /* onWheel={e => {
          console.log(e.deltaX);
          console.log(e.deltaY);
          let a = 1;
          if (e.deltaY === 125) a = this.state.d - 1;
          if (e.deltaY === -125) a = this.state.d + 1;
          if (a === 0) a = 1;
          this.setState({ d: a });
        }}*/
/*     >
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
          }}*/
/*            />
              <circle
                //style={props1}
                r="22"
                cx={this.state.currentPosition.x}
                cy={this.state.currentPosition.y}
                fill="orangered"
                stroke="crimson"
                strokeWidth="5"
              />
            </g>
            <animated.path
              d={this.state.traveledPath}
              fill="transparent"
              stroke="black"
              //style={props1}
            />
          </svg>
        </ReactSVGPanZoom>

        <input id="5" type="button" value="Путь" onClick={this.toggle} />
      </div>
    );
  }
}

export default App;
/*
        <A
          x={this.state.currentPosition.x}
          y={this.state.currentPosition.y}
          way={this.state.traveledPath}
          //toggle={this.state.showPath}
          zoom={this.state.d}
        />
        */
