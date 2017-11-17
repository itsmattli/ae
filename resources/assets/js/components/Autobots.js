/**
 * Created by Matthew on 2017-11-16.
 */
/**
 * Created by Matthew on 2017-11-16.
 */
import React, { Component } from 'react';

class Autobots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roster: []
        }
    }

    componentWillReceiveProps(props) {
        this.parseRoster(props.data);
    }

    parseRoster(data){
        let autobots = data.map((autobots) => {
            return(
                <tr key={autobots.id}>
                    <td>{autobots.name}</td>
                    <td>{autobots.strength}</td>
                    <td>{autobots.intelligence}</td>
                    <td>{autobots.endurance}</td>
                    <td>{autobots.rank}</td>
                    <td>{autobots.courage}</td>
                    <td>{autobots.firepower}</td>
                    <td>{autobots.skill}</td>
                    <td>
                        {/*<i onClick={(e) => this.deleteDecepticon(decepticon.id, e)} className="fa fa-trash-o fa-lg"></i>*/}
                    </td>
                </tr>
            )
        });
        this.setState({roster: autobots})
    }

    render() {
        return (
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
                                <td scope="col">RANK</td>
                                <td scope="col">COUR</td>
                                <td scope="col">FIRE</td>
                                <td scope="col">SKL</td>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.roster}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default Autobots;