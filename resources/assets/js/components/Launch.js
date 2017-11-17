import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Decepticons from './Decepticons.js'
import Autobots from './Autobots.js'

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

class Launch extends Component {

    constructor() {
        super();
        this.state = {
            autobots: [],
            decepticons: [],
            createData: [],
            modalIsOpen: false,
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
        if (createData.get('faction') == 'A') {
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
        }).then(results => {
            console.log(results)
        })
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
                this.getAutobots();
            }
        })
    }

    render() {
        return (
            <div>
                <div className="create">
                    <button className="btn btn-primary" onClick={this.openModal}>Create Transformer</button>
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
                                <label htmlFor="name">Enter Name</label>
                                <input className="form-control" id="name" name="name" type="text" />
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
                    </Modal>
                </div>

                <div className="row">
                    <Autobots
                        data={this.state.autobots}
                        delete={this.deleteAutobot.bind(this)}
                    />
                    <Decepticons
                        data={this.state.decepticons}
                        delete={this.deleteDecepticon.bind(this)}
                    />
                </div>
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