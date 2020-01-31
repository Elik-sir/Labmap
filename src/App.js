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
    pathVisible: false,
  };
  Viewer = null;

  componentDidMount() {
    this.Viewer.fitToViewer();
  }
  onPathVisibleChange = () => {
    this.setState(state => ({ pathVisible: !state.pathVisible }));
  };

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

  addPath = event => {
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
  };

  render() {
    return (
      <div>
        <ReactSVGPanZoom
          width={1000}
          height={600}
          ref={Viewer => (this.Viewer = Viewer)}
          tool={this.state.tool}
          onChangeTool={tool => this.changeTool(tool)}
          value={this.state.value}
          onChangeValue={value => this.changeValue(value)}
          onClick={event =>
            console.log('click', event.x, event.y, event.originalEvent)
          }
          onMouseMove={e => this.addPath(e)}
        >
          <svg width={1000} height={600} onMouseMove={this.addPath}>
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
              stroke={this.state.pathVisible ? 'black' : 'transparent'}
            />
          </svg>
        </ReactSVGPanZoom>
        <input type="button" value="Путь" onClick={this.onPathVisibleChange} />
      </div>
    );
  }
}
