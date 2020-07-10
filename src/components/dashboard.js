import React, { Component} from "react";
//import axios from 'axios';
import Nav from './nav';

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {all: []};
      }

      componentDidMount = () => {

      }

    render() {

return (
<div className="container mt-5">
    <Nav name="Dashboard" />

    <div className="row">
        <div className="col-md-4">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <button type="button" class="btn btn-info">
                Number of signale <span class="badge badge-light">4</span>
            </button>
        </div>
        </div>
        <div className="col-md-4">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <button type="button" class="btn btn-info">
                Number of signale <span class="badge badge-light">4</span>
            </button>
        </div>
        </div>
        <div className="col-md-4">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <button type="button" class="btn btn-info">
                Number of signale <span class="badge badge-light">4</span>
            </button>
        </div>
        </div>
    </div>

</div>
        );
    }
}