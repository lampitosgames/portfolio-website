//Import react/redux stuff
import React, {Component} from 'react';
import {connect} from 'react-redux';
//Import all required actions to connect to this component
import {incrementCounter, decrementCounter} from '../actions';

//The test component is an example/template component
class TestComponent extends Component {
    //Post-construction custom javascript to run
    componentDidMount() {
        //Bind an event
        window.addEventListener('scroll', this.handleScroll);
    }

    //Destructor
    componentWillUnmount() {
        //Unbind event
        window.removeEventListener('scroll', this.handleScroll);
    }

    //Event handler
    handleScroll(e) {
        //Test scroll event
        let scrollTop = document.querySelector("html").scrollTop;
        /*
        //Example code that floats a header when the document is scrolled past a certain point
        if (scrollTop/1.5 > document.querySelector(".timelineHeaderTitle").offsetHeight) {
            document.querySelector(".timelineHeaderLinkList").style.position = "fixed";
        } else {
            document.querySelector(".timelineHeaderLinkList").style.position = "relative";
        }
        */
    }

    handleClick() {

    }
    //Render function
    render() {
        return (
            <div className={"testComponentClass"}>
                <div onClick={() => this.props.decrementCounter(1)} className={"decrementButtonClass"}>-</div>
                <div onClick={() => this.props.incrementCounter(1)} className={"incrementButtonClass"}>+</div>
                <div className={"counterDisplay"}>{this.props.counter}</div>
            </div>
        )
    }
}

//Map state from the store to the component's props variable
const mapStateToProps = (state) => {
    return { counter: state.settings.counter };
}

//Map action dispatch functions to the component's props variable
const mapDispatchToProps = (dispatch) => {
    return {
        incrementCounter: (_amount) => {
            dispatch(incrementCounter(_amount));
        },
        decrementCounter: (_amount) => {
            dispatch(decrementCounter(_amount));
        }
    };
}

//Use redux to fully connect everything up
export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
