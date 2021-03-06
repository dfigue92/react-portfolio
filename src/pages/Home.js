import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import {
  DrawSimple,
  DrawClean,
  DrawIntrig,
  DrawCode,
  DrawLine,
  DrawBlackLines,
  DrawDownArrow
} from "../components/animations/HomeAnimations";
import MediaQuery from 'react-responsive';
import posed from "react-pose";
import { tween } from "popmotion";
import { Route, Link } from "react-router-dom";
import Hub from "./Hub";
import "../styles/pages/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <Helmet>
          <style>{'body {background-color:#0e0d0d;}'}</style>
        </Helmet>

        <div className="headlines">
          <DrawSimple id='drawSimple'/>
          <DrawClean id='drawClean'/>
          <DrawIntrig id='drawIntrig'/>
        </div>

        <div className='animationContainer'>
          <div className="codeheadline">
            <DrawCode />
          </div>

          <div className='lineContainer'>
            <MediaQuery query='(min-device-width:480px)'>
              <DrawLine />
              <DrawBlackLines />
            </MediaQuery>
          </div>
            <div className="downarrow">
              <Link to="/hub">
                <RotateDiv>
                  <DrawDownArrow interval={1000*11}/>           
                </RotateDiv>
              </Link>
                <Route path="/hub" component={Hub} />
            </div>
        </div>
      </div>
    );
  }
}

export default Home;

// Rotate DrawDownArrow //

const rotateProps = {
  still: {
    rotateY: 0,
    transition: props => tween({ ...props, duration: 1000 })
  },
  spin: {
    rotateY: 180,
    transition: props => tween({ ...props, duration: 1000 })
  }
};

const Rotate = posed.div(rotateProps);

export class RotateDiv extends React.Component {
  state = { motion: false };

  componentDidMount() {
    setInterval(() => {
      this.setState({ motion: !this.state.motion });
    }, 5000);
  }

  render() {
    return (
      <Rotate pose={this.state.motion ? "spin" : "still"}>
        {this.props.children}
      </Rotate>
    );
  }
}
