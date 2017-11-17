/**
 * Created by Matthew on 2017-11-17.
 */
import React, { Component } from 'react';

class BattleDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            survivors: [],
            victors: [],
            gameOver: [],
            display: [],
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            survivors: props.survivors,
            victors: props.victors,
            gameOver: props.gameOver
        })
    }

    processDisplay() {
        let gameOver = this.state.gameOver
        let survivors = this.state.survivors
        let victors = this.state.victors
        if(gameOver) {
            let display = () => {
                return(
                    <div>
                        working
                    </div>
                )
            }
            this.setState({
                display: display
            })
        }
    }

    render() {
        return (
            <div className="col-sm-6">
                {this.state.display}
            </div>
        );
    }
}

export default BattleDisplay;
