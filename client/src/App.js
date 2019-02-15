import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { viewportUpdate } from './actions';
//Import scss file
import './scss/index.scss';
//Import javascript stuffs
import Utils from './js/Utils.js';
//Import components
import MenuBarComponent from './components/menu-bar';
import SidebarComponent from './components/sidebar';
import HomePageComponent from './components/pages/home';

const AboutComp = () => {
    return (
        <div>testing</div>
    )
}

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
    //TODO:*React-Router - everything inside of the page-content-router_TEMP div
    //      will change based on the page route (like .com/, .com/work, .com/hi)
    //     *New UI elements level with SidebarComponent will be static on the
    //      page when relatively positioned
    //     *New UI elments level with menuBarComponent will be site-wide, but
    //      move with the loaded page content when the sidebar is opened
    //      SidebarComponent and any other site-wide static UI might need
    //      access to the page route as well. Provide that either via react-
    //      router or redux
    //
    render() {
        let contentWrapClass = this.props.sidebarActive ? "content-wrap content-wrap-sidebar-active" : "content-wrap";
        console.dir(this.props);
        return (
            <div className={"app-container"}>
                <SidebarComponent sidebarActive={this.props.sidebarActive} location={this.props.location}/>
                <div className={contentWrapClass}>
                    <MenuBarComponent/>
                    <Route exact path="/" component={HomePageComponent}/>
                    <Route path="/about" component={AboutComp}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));