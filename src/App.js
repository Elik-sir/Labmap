import React from "react";
import "./App.css";
import {
  fitSelection,
  fitToViewer,
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_NONE,
  zoomOnViewerCenter
} from "react-svg-pan-zoom";
import LabMap from "./components/LabMap";
import PersonCircle from "./components/PersonCircle";
import PersonPath from "./components/PersonPath";
import Media from "react-media";

export default class App extends React.PureComponent {
  state = {
    currentPosition: { x: 300, y: 400 },
    logPosition: [],
    traveledPath: "",
    mapSize: { width: 1000, height: 700 },
    d: 0,
    tool: TOOL_NONE,
    value: INITIAL_VALUE,
    pathVisible: false
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

  onClickHandler = event => {
    //TODO: add this later
  };
  pushPathPointToTraveledPath = event => {
    const currentPosition = { x: event.x, y: event.y };
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
  onChangeSize(matches) {
    let mapSize = { x: 0, y: 0 };
    if (matches.small) {
      mapSize.width = 400;
      mapSize.height = 600;
    }
    if (matches.medium) {
      mapSize.width = 650;
      mapSize.height = 600;
      // alert("qweqwq");
    }
    if (matches.ml) {
      mapSize.width = 800;
      mapSize.height = 600;
    }
    if (matches.large) {
      mapSize.width = 1000;
      mapSize.height = 600;
    }
    this.setState({ mapSize });
  }

  render() {
    const {
      traveledPath,
      pathVisible,
      currentPosition,
      tool,
      value
    } = this.state;
    return (
      <div className="zx">
        <Media
          queries={{
            small: "(max-width: 500px)",
            medium: "(min-width: 501px) and (max-width: 650px)",
            ml: "(min-width: 651px) and (max-width: 999px)",
            large: "(min-width: 1000px)"
          }}
          onChange={matches => this.onChangeSize(matches)}
        ></Media>
        <ReactSVGPanZoom
          className="qq"
          width={this.state.mapSize.width}
          height={this.state.mapSize.height}
          ref={Viewer => (this.Viewer = Viewer)}
          tool={tool}
          onChangeTool={tool => this.changeTool(tool)}
          value={value}
          onChangeValue={value => this.changeValue(value)}
          onClick={this.onClickHandler}
          onMouseMove={e => this.pushPathPointToTraveledPath(e)}
        >
          <svg width={1000} height={600}>
            <LabMap />
            <PersonCircle currentPosition={currentPosition} />
            <PersonPath traveledPath={traveledPath} pathVisible={pathVisible} />
          </svg>
        </ReactSVGPanZoom>
        <input type="button" value="Путь" onClick={this.onPathVisibleChange} />
      </div>
    );
  }
}
