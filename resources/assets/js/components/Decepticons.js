/**
 * Created by Matthew on 2017-11-16.
 */
import React, { Component } from 'react';

class Decepticons extends Component {

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
        let decepticons = data.map((decepticons) => {
            return(
                <tr key={decepticons.id}>
                    <td>{decepticons.name}</td>
                    <td>{decepticons.strength}</td>
                    <td>{decepticons.intelligence}</td>
                    <td>{decepticons.endurance}</td>
                    <td>{decepticons.rank}</td>
                    <td>{decepticons.courage}</td>
                    <td>{decepticons.firepower}</td>
                    <td>{decepticons.skill}</td>
                    <td>
                        {/*<i onClick={(e) => this.deleteDecepticon(decepticon.id, e)} className="fa fa-trash-o fa-lg"></i>*/}
                    </td>
                </tr>
            )
        });
        this.setState({roster: decepticons})
    }

    render() {
        return (
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


export default Decepticons;