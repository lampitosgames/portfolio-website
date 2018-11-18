//Import react/redux stuff
import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {toggleSidebar} from '../../actions';

//The test component is an example/template component
class SidebarComponent extends Component {
    //Post-construction custom javascript to run
    componentDidMount() {}

    //Destructor
    componentWillUnmount() {}

    //Render function
    render() {
        let sidebarClass = this.props.sidebarActive ? "sidebar-wrap sidebar-active" : "sidebar-wrap";
        return (
            <div className={sidebarClass}>
                <div>Home</div>
                <div>Work</div>
                <div>About</div>
                <div>Resume</div>
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
