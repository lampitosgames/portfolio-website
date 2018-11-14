import React, {Component} from 'react';
import {connect} from 'react-redux';
import {viewportUpdate} from './actions';
//Import scss file
import './scss/index.scss';
//Import javascript stuffs
import Utils from './js/Utils.js';
//Import components
import GameCanvasComponent from './components/GameCanvasComponent.js';

class App extends Component {
    componentDidMount() {
        //Call resize whenever the window size changes
        window.addEventListener("resize", this.resize.bind(this));
        this.resize.bind(this)();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }
    resize() {
        let viewport = Utils.getViewport();
        this.props.viewportUpdate(viewport);
    }
    render() {
        //the sidebar-active class needs to be added to the sidebar-wrap div
        return (
            <div className={"app-container"}>
                <div className={"sidebar-wrap"}>Home</div>
                <div className={"content-wrap"}>Content</div>
                <GameCanvasComponent/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewportUpdate: (_newViewport) => {
            dispatch(viewportUpdate(_newViewport));
        }
    }
}

export default connect(null, mapDispatchToProps)(App);
