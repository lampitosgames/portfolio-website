//Import react/redux stuff
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../actions';

//The test component is an example/template component
class SidebarComponent extends Component {
  //Render function
  render() {
    let sidebarClass = this.props.sidebarActive ? "sidebar-wrap sidebar-active" : "sidebar-wrap";
    return (
      <div className={sidebarClass}>
        <NavLink className={"nav-link"} activeClassName={"nav-link-active"} exact to="/">Home</NavLink>
        <NavLink className={"nav-link"} activeClassName={"nav-link-active"} to="/work">Work</NavLink>
        <NavLink className={"nav-link"} activeClassName={"nav-link-active"} to="/about">About</NavLink>
        <NavLink className={"nav-link"} activeClassName={"nav-link-active"} to="/resume">Resume</NavLink>
      </div>
    )
  }
}

//Map state from the store to the component's props variable
const mapStateToProps = (state) => {
  return {};
}

//Map action dispatch functions to the component's props variable
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: () => {
      dispatch(toggleSidebar());
    }
  };
}

//Use redux to fully connect everything up
export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);