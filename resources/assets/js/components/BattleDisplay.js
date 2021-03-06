/**
 * Created by Matthew on 2017-11-17.
 */
import React, { Component } from 'react';
import YouTube from "react-youtube";

class BattleDisplay extends Component {

    constructor(props) {
        super(props);
        console.log(props.victors)
        console.log(props.survivors)
        this.state = {
            survivors: props.survivors,
            victors: props.victors,
            gameOver: props.gameOver,
            battles: props.battles,
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            survivors: props.survivors,
            victors: props.victors,
            gameOver: props.gameOver,
            battles: props.battles,
        })
    }

    render() {
        const gameOver = this.state.gameOver
        const survivors = this.state.survivors
        const victors = this.state.victors
        const battles = this.state.battles
        let autoVic = 0;
        let autoVicString = "";
        let decVic = 0;
        let decVicString = "";
        var survivorsString = "";
        var victoryString = "";
        var display = [];
        var videoId = "";
        if (gameOver) {
            display.push(
                <div key="1">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">Battle Results</div>
                                <div className="panel-body">
                                    Optimus fought Predaking: Game Over!
                                </div>
                            </div>
                        </div>
                        <div className="youtube">
                            <YouTube
                                videoId="yNJbAJcVCGc"
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            for (let i = 0; i < victors.length; i++) {
                if(victors[i].faction == "A") {
                    autoVic++
                    autoVicString += victors[i].name + ", "
                } else {
                    decVic++
                    decVicString += victors[i].name + ", "
                }
            }
            if (autoVic > decVic) {
                victoryString = "Winning Team(Autobots): " + autoVicString
                videoId = "A52--FKUQgU"
                for(let i = 0; i < survivors.length; i++) {
                    if(survivors[i].faction == "D"){
                        survivorsString += survivors[i].name + ", "
                    }
                }
            } else if (decVic > autoVic) {
                victoryString = "Winning Team(Decepticon): " + decVicString
                videoId = "VMUjcr87XfM"
                for(let i = 0; i < survivors.length; i++) {
                    if(survivors[i].faction == "A"){
                        survivorsString += survivors[i].name + ", "
                    }
                }
            } else {
                victoryString = "Tie!"
                videoId = null
                for (let i = 0; i < survivors.length; i++) {
                    survivorsString += survivors[i].name + ", "
                }
            }

            display.push(
                <div key="1">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">Battle Results</div>
                                <div className="panel-body">
                                    Battles: {battles}
                                    <br />
                                    {victoryString}
                                    <br />
                                    Survivors (on losing team): {survivorsString}
                                </div>
                            </div>
                        </div>
                        <div className="youtube">
                            {videoId &&
                                <YouTube
                                    videoId={videoId}
                                    />
                            }
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="container">
                {display}
            </div>
        );
    }
}

export default BattleDisplay;
