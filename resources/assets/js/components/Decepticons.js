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

    /**
     * Parse data for display by component
     * @param data
     */
    parseRoster(data){
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
                        {<i onClick={(e) => this.delete(decepticon.id, e)} className="fa fa-trash-o fa-lg"></i>}
                    </td>
                </tr>
            )
        });
        this.setState({roster: decepticons})
    }

    /**
     * contains a function callback for the parent deleteDecepticon()
     * @param id
     * @param e
     */
    delete(id, e) {
        this.props.deleteDecepticon(id,e)
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