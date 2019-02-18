import React, { Component } from 'react';
import GameCanvasComponent from '../GameCanvasComponent.js';

export default class HomePageComponent extends Component {
  render() {
    return (
      <div className={"home-screen-wrap"}>
        <div className={"site-title"}>Daniel Timko</div>
        <GameCanvasComponent/>
      </div>
    )
  }
}