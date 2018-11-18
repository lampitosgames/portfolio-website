import React, {Component} from 'react';
import {connect} from 'react-redux';
import {viewportUpdate} from './actions';
//Import scss file
import './scss/index.scss';
//Import javascript stuffs
import Utils from './js/Utils.js';
//Import components
import GameCanvasComponent from './components/GameCanvasComponent.js';
import MenuBarComponent from './components/menu-bar';
import SidebarComponent from './components/sidebar';

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
        let contentWrapClass = this.props.sidebarActive ? "content-wrap content-wrap-sidebar-active" : "content-wrap";
        return (
            <div className={"app-container"}>
                <SidebarComponent sidebarActive={this.props.sidebarActive}/>
                <div className={contentWrapClass}>
                    <MenuBarComponent/>
                    <div className={"site-title"}>Daniel Timko</div>
                    <GameCanvasComponent/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { sidebarActive: state.sidebar.active };
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewportUpdate: (_newViewport) => {
            dispatch(viewportUpdate(_newViewport));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
