//Import react/redux stuff
import React, {Component} from 'react';
import {connect} from 'react-redux';
//Import all required actions to connect to this component
import {toggleSidebar} from '../../actions';

//The test component is an example/template component
class MenuBarComponent extends Component {
    //Render function
    render() {
        return (
            <div onClick={this.props.toggleSidebar} className={"hamburger-wrap"}>
              x
            </div>
        )
    }
}

//Map state from the store to the component's props variable
const mapStateToProps = (state) => {
    return { sidebarActive: state.sidebar.active };
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuBarComponent);
