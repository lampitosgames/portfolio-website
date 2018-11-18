//Import react/redux stuff
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsteroidGame from '../js/Game.js';

class GameCanvasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            ctx: null
        }
        this.canvasElement = React.createRef();
    }
    componentDidMount() {
        let asteroidCanvas = this.canvasElement.current;
        let asteroidCanvasCtx = this.canvasElement.current.getContext('2d');
        AsteroidGame.init(asteroidCanvas, asteroidCanvasCtx);
        this.setState({
            canvas: this.canvasElement.current,
            ctx: asteroidCanvasCtx
        });
        AsteroidGame.start();
    }

    componentDidUpdate(_prevProps) {
        if (_prevProps.viewport !== this.props.viewport) {
            this.setState({canvas: this.canvasElement.current});
            //TODO: Restart game and recycle asteroid objects when the window size changes.
        }
    }

    render() {
        return (
            <canvas className={"asteroid-canvas"} ref={this.canvasElement} width={this.props.viewport.width} height={this.props.viewport.height}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {viewport: state.settings.viewport};
}

export default connect(mapStateToProps)(GameCanvasComponent);
