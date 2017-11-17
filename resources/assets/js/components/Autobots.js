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

    /**
     * Parses the data recieved as a prop for display in this component
     * @param data
     */
    parseRoster(data){
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
                        {<i onClick={(e) => this.delete(autobot.id, e)} className="fa fa-trash-o fa-lg"></i>}
                    </td>
                </tr>
            )
        });
        this.setState({roster: autobots})
    }

    /**
     * contains a function callback for the parent deleteAutobot()
     * @param id
     * @param e
     */
    delete(id, e) {
        this.props.deleteAutobot(id,e)
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