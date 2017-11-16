import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Launch extends Component {

    constructor() {
        super();
        this.state = {
            autobots: [],
            decepticons: [],
        }
    }

    componentDidMount() {
        fetch('/autobots')
            .then(results => {
                return results.json()
            }).then(data => {
                console.log(data)
                let autobots = data.map((autobot) => {
                    return(
                        <tr key={autobot.id}>
                            <td>{autobot.name}</td>
                            <td>{autobot.strength}</td>
                            <td>{autobot.intelligence}</td>
                            <td>{autobot.endurance}</td>
                            <td>{autobot.rank}</td>
                            <td>{autobot.courage}</td>
                            <td>{autobot.firepower}</td>
                            <td>{autobot.skill}</td>
                            <td>
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )
                })
            this.setState({ autobots: autobots})
        })

        fetch('/decepticons')
            .then(results => {
                return results.json()
            }).then(data => {
            console.log(data)
            let decepticons = data.map((decepticon) => {
                return(
                    <tr key={decepticon.id}>
                        <td>{decepticon.name}</td>
                        <td>{decepticon.strength}</td>
                        <td>{decepticon.intelligence}</td>
                        <td>{decepticon.endurance}</td>
                        <td>{decepticon.rank}</td>
                        <td>{decepticon.courage}</td>
                        <td>{decepticon.firepower}</td>
                        <td>{decepticon.skill}</td>
                        <td>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
            })
            this.setState({ decepticons: decepticons})
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-5 col-lg-offset-1">
                    <div className="panel panel-default">
                        <div className="panel-heading">Autobots</div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                    <tr scope="row">
                                        <td scope="col">Name</td>
                                        <td scope="col">STR</td>
                                        <td scope="col">INT</td>
                                        <td scope="col">END</td>
                                        <td scope="col">RNK</td>
                                        <td scope="col">COUR</td>
                                        <td scope="col">FIRE</td>
                                        <td scope="col">SKL</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.autobots}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="panel panel-default">
                        <div className="panel-heading">Decepticons</div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                    <tr scope="row">
                                        <td scope="col">Name</td>
                                        <td scope="col">STR</td>
                                        <td scope="col">INT</td>
                                        <td scope="col">END</td>
                                        <td scope="col">RNK</td>
                                        <td scope="col">COUR</td>
                                        <td scope="col">FIRE</td>
                                        <td scope="col">SKL</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.decepticons}
                                </tbody>
                            </table>
                        </div>
                    </div>
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