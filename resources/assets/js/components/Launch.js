import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Decepticons from './Decepticons.js'
import Autobots from './Autobots.js'
import BattleDisplay from './BattleDisplay.js'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-25%',
        transform             : 'translate(-50%, -50%)',
        height                : '400px',
        width                 : '700px'
    }
};

var status = {
    AUTOBOT_WIN: -1,
    BATTLE_ON: 0,
    DECEPTICON_WIN: 1,
    BOTH_DESTROYED: 2,
    GAME_OVER: 3
};

var statDiff = {
    AUTOBOT_OVERWHELMING: -1,
    EVEN: 0,
    DECEPTICON_OVERWHELMING: 1,
}

class Launch extends Component {

    constructor() {
        super();
        this.state = {
            autobots: [],
            decepticons: [],
            createData: [],
            victors: [],
            survivors: [],
            gameOver: false,
            modalIsOpen: false,
            battleComplete: false,
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createTransformer = this.createTransformer.bind(this);
    }

    componentDidMount() {
        this.getAutobots();
        this.getDecepticons();
    }

    getAutobots() {
        fetch('api/autobots')
            .then(results => {
                return results.json()
        }).then(data => {
            this.setState({ autobots: data})
        })
    }


    getDecepticons() {
        fetch('api/decepticons')
            .then(results => {
                return results.json()
        }).then(data => {
            this.setState({ decepticons: data})
        })
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    createTransformer(e) {
        var url = "";
        e.preventDefault()
        const createData = new FormData(e.target)
        let faction = createData.get('faction')
        if (faction == 'A') {
            url = '/autobots'
        } else {
            url = '/decepticons'
        }
        createData.delete('faction')
        fetch('api' + url, {
            method: 'post',
            body: this.stringifyFormData(createData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf_token
            }
        }).then(response => {
            if (response.ok) {
                if (faction == 'A') {
                    this.getAutobots();
                } else {
                    this.getDecepticons();
                }
            }
        })
        this.setState({ modalIsOpen: false})
    }

    stringifyFormData(fd) {
        const data = {};
            for (let key of fd.keys()) {
                data[key] = fd.get(key);
            }
    return JSON.stringify(data, null, 2);
    }

    deleteDecepticon(id, e) {
        e.preventDefault();
        fetch('api/decepticons/' + id, {
            method: 'delete',
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
        }).then(response => {
            if(response.ok) {
                this.getDecepticons();
            }
        })
    }

    deleteAutobot(id, e) {
        e.preventDefault();
        fetch('api/autobots/' + id, {
            method: 'delete',
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
        }).then(response => {
            if(response.ok) {
                this.getAutobots()
            }
        })
    }

    /**
     * Battles opposing forces for galactic dominance
     * @param e
     */
    battle(e) {
        e.preventDefault()
        let decRoster = this.state.decepticons
        let autRoster = this.state.autobots
        let count = (decRoster.length < autRoster.length) ? decRoster.length : autRoster.length
        let survivors = []
        let victors = []

        for (let i = 0; i < count; i++) {
            let battleStatus = this.matrixOfLeadershipCheck(autRoster[i], decRoster[i])
            if (battleStatus == status.BATTLE_ON) {
                battleStatus = this.courStrSklCheck(autRoster[i], decRoster[i])
            }
            if (battleStatus == status.BATTLE_ON) {
                battleStatus = this.overallMight(autRoster[i], decRoster[i])
            }

            switch (battleStatus) {
                case status.AUTOBOT_WIN :
                    victors.push(autRoster[i])
                    break
                case status.DECEPTICON_WIN :
                    victors.push(decRoster[i])
                    break
                case status.GAME_OVER :
                    console.log("game over");
                    this.setState({
                        battleComplete: true,
                        gameOver: true
                    })
                    return;
                default: break
            }
        }
        let longer = (decRoster.length < autRoster.length) ? autRoster : decRoster
        for(let i = count; i < longer.length; i++) {
            survivors.push(longer[i])
        }
        this.setState({
            battleComplete: true,
            gameOver : false,
            victors : victors,
            survivors : survivors,
        })
    }

    matrixOfLeadershipCheck(autobot, decepticon) {
        if(autobot.name.toUpperCase() == "OPTIMUS PRIME" && decepticon.name.toUpperCase() == "PREDAKING") {
            return status.GAME_OVER
        } else if (autobot.name.toUpperCase() == "OPTIMUS PRIME") {
            return status.AUTOBOT_WIN
        } else if (decepticon.name.toUpperCase() == "PREDAKING") {
            return status.DECEPTICON_WIN
        } else {
            return status.BATTLE_ON
        }
    }


    courStrSklCheck(autobot, decepticon) {
        let courDiff = autobot.courage - decepticon.courage
        let strDiff = autobot.strength - decepticon.strength
        let sklDiff = autobot.skill - decepticon.skill
        let courCheck = 0, strCheck = 0, sklCheck = 0
        if(courDiff <= -4) {
            courCheck = statDiff.DECEPTICON_OVERWHELMING
        } else if (courDiff >= 4) {
            courCheck = statDiff.AUTOBOT_OVERWHELMING
        } else {
            courCheck = statDiff.EVEN
        }

        if (strDiff <= -3) {
            strCheck = statDiff.DECEPTICON_OVERWHELMING
        } else if (courDiff >= 3) {
            strCheck = statDiff.AUTOBOT_OVERWHELMING
        } else {
            strCheck = statDiff.EVEN
        }

        switch (strCheck + courCheck) {
            case -2 :
            case -1 :
                return status.AUTOBOT_WIN
                break
            case 1 :
            case 2 :
                return status.DECEPTICON_WIN
                break
            case 0:
                if(sklDiff <= -3) {
                    return status.DECEPTICON_WIN
                } else if (sklDiff >= 3) {
                    return status.AUTOBOT_WIN
                } else {
                    return status.BATTLE_ON
                }
            default: break
        }
    }

    overallMight(autobot, decepticon){
        let overallAut = autobot.strength + autobot.intelligence + autobot.speed + autobot.endurance + autobot.firepower
        let overallDec = decepticon.strength + decepticon.intelligence + decepticon.speed + decepticon.endurance + decepticon.firepower
        if (overallAut == overallDec) {
            return status.BOTH_DESTROYED
        } else if (overallAut > overallDec) {
            return status.AUTOBOT_WIN
        } else {
            return status.DECEPTICON_WIN
        }
    }



    render() {
        const battleComplete = this.state.battleComplete
        return (
            <div>
                <div className="row">
                    <div className="create">
                        <button className="btn btn-primary" onClick={this.openModal}>Create Transformer</button>
                    </div>
                    <br />
                    <div className="battle">
                        <button className="btn btn-success" onClick={this.battle.bind(this)}>Battle!</button>
                    </div>
                    <br />
                </div>
                <div className="row">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Create Transformer"
                    >
                        <form onSubmit={this.createTransformer}>
                            <div className="form-group">
                                <label htmlFor="name">Transformer Name</label>
                                <input className="form-control" id="name" name="name" type="text" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="class">Select Faction</label>
                                <select className="form-control" id="faction" name="faction">
                                    <option value="A">Autobot</option>
                                    <option value="D">Decepticon</option>
                                </select>
                            </div>
                            <div className="form-inline row">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>STR </td>
                                            <td>
                                                <input className="form-control" id="strength" name="strength" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                            <td>INT </td>
                                            <td>
                                                <input className="form-control" id="intelligence" name="intelligence" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                            <td>SPD </td>
                                            <td>
                                                <input className="form-control" id="speed" name="speed" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                            <td>END </td>
                                            <td>
                                                <input className="form-control" id="endurance" name="endurance" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>RANK </td>
                                            <td>
                                                <input className="form-control" id="rank" name="rank" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                            <td>COUR </td>
                                            <td>
                                                <input className="form-control" id="courage" name="courage" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                            <td>FIRE </td>
                                            <td>
                                                <input className="form-control" id="firepower" name="firepower" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                            <td>SKL </td>
                                            <td>
                                                <input className="form-control" id="skill" name="skill" type="number" min="0" max="10" step="1" defaultValue="5"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                        <button className="btn btn-primary" onClick={this.closeModal}>Close</button>
                    </Modal>
                </div>

                <div className="row">
                    <Autobots
                        data={this.state.autobots}
                        deleteAutobot={this.deleteAutobot.bind(this)}
                    />
                    <Decepticons
                        data={this.state.decepticons}
                        deleteDecepticon={this.deleteDecepticon.bind(this)}
                    />
                </div>
                {battleComplete &&
                    <BattleDisplay
                        victors={this.state.victors}
                        survivors={this.state.survivors}
                        gameOver={this.state.gameOver}
                    />
                }
            </div>
        );
    }
}
export default Launch;

// We only want to try to render our component on pages that have a div with an ID
// of "example"; otherwise, we will see an error in our console
if (document.getElementById('launch')) {
    ReactDOM.render(<Launch />, document.getElementById('launch'));
}