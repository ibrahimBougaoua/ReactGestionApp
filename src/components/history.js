import React, { Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';

async function signalisation(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation/' + id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

// handle button click of login form
async function signaler() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signaler');
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class History extends Component {
    
    constructor(props) {
        super(props);
        this.state = {dataAllSignalisations: []};
      }

      componentDidMount = () => {

        signaler().then(response => {
            let signalisations = [];
            //console.log(response.data);
            response.data.map((element) =>
            signalisation(element['signalisation_id']).then(response => {
                signalisations = this.state.dataAllSignalisations;
                signalisations.push(response.data);
                //console.log(response.data);
              this.setState({
                dataAllSignalisations: signalisations
              })
            })
            );
        });

      }

    render() {

const all_data = this.state.dataAllSignalisations.map((element,key) =>
<tr>
<td key={key}>{element.desc}</td>
<td key={key}>{element.localisation}</td>
<td key={key}>{element.lieu}</td>
<td key={key}>{element.nature}</td>
<td key={key}>{element.cause}</td>
<td key={key}>{element.created_at}</td>
<td key={key}><Link to={'signale/single/' + element.id} className="btn btn-sm btn-outline-info">View</Link></td>
</tr>
);

return (
<div className="container mt-5">
    <Nav name="History" />

    <div className="row">
        <div className="col-md-12">
        <table className="table shadow">
  <thead>
    <tr className="border-top-0">
      <th scope="col">Desc</th>
      <th scope="col">Localisation</th>
      <th scope="col">Lieu</th>
      <th scope="col">Nature</th>
      <th scope="col">Cause</th>
      <th scope="col">Created at</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
  {all_data}
  </tbody>
</table>
        </div>
    </div>
</div>
        );
    }
}