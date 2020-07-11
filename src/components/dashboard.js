import React, { Component} from "react";
import axios from 'axios';
import Nav from './nav';

async function usersCount() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercount')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function equipeCount() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipecount')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalerCount(user_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalercount/' + user_id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalisationCount() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationcount')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalisationDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationdashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userSignalisationDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usersignalisationdashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userRoleDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/userroledashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function equipeDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipedashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {all: [],usersCountRec: 0,equipeCountRec: 0,signalerCountRec: 0,signalisationCountRec: 0,signalisationDashboardRec: 0,userSignalisationDashboardRec: 0,userRoleDashboardRec: 0,equipedashboardRec: 0}
      }

      componentDidMount = () => {
        usersCount().then(response => {
            this.setState({
                usersCountRec: response.data
            });
        });
        equipeCount().then(response => {
            this.setState({
                equipeCountRec: response.data
            });
        });
        signalerCount(localStorage.getItem('id')).then(response => {
            this.setState({
                signalerCountRec: response.data
            });
        });
        signalisationCount().then(response => {
            this.setState({
                signalisationCountRec: response.data
            });
        });
        signalisationDashboard().then(response => {
            this.setState({
                signalisationDashboardRec: response.data
            });
        });
        userSignalisationDashboard().then(response => {
            this.setState({
                userSignalisationDashboardRec: response.data
            });
        });
        userRoleDashboard().then(response => {
            this.setState({
                userRoleDashboardRec: response.data
            });
        });
        equipeDashboard().then(response => {
            this.setState({
                equipedashboardRec: response.data
            });
        });
      }
      
render() {

console.log(this.state.signalisationDashboardRec)

//this.state.signalisationDashboardRec.map((element,key) =>
//<p key={key}>{element}</p>
//);

return (
<div className="container mt-5">
    <Nav name="Dashboard" />

    <div className="row">
        <div className="col-md-3">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <button type="button" class="btn btn-info">
                Number of users <span class="badge badge-light">{this.state.usersCountRec}</span>
            </button>
        </div>
        </div>
        <div className="col-md-3">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <button type="button" class="btn btn-info">
                Number of equipes <span class="badge badge-light">{this.state.equipeCountRec}</span>
            </button>
        </div>
        </div>
        <div className="col-md-3">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <button type="button" class="btn btn-info">
                Number of signale <span class="badge badge-light">{this.state.signalerCountRec}</span>
            </button>
        </div>
        </div>
        <div className="col-md-3">
        <div class="shadow p-3 mb-5 bg-white rounded">
            <button type="button" class="btn btn-info">
                Number of signalisation <span class="badge badge-light">{this.state.signalisationCountRec}</span>
            </button>
        </div>
        </div>
    </div>

</div>
        );
    }
}