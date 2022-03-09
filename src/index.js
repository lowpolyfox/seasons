import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./js/components/SeasonDisplay";
import Spinner from "./js/components/Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (error) => this.setState({ errorMessage: error.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat)
      return <div>Error: {this.state.errorMessage}</div>;

    if (!this.state.errorMessage && this.state.lat)
      return <SeasonDisplay latitude={this.state.lat} />;

    return <Spinner message="Please accept location request." />;
  }

  render() {
    return <div className="wrapper">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
