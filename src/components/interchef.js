import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';

async function all_interventions() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/chefintervention')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class InterChef extends Component {
    
    constructor(props) {
        super(props);
        this.state = {all: []};
      }

      componentDidMount = () => {
        all_interventions().then(response => {
            this.setState({
                all: response.data
            });
        });
      }

    render() {

const all_data = this.state.all.map((element) =>
<tr>
<td key={element['desc']}>{element['desc']}</td>
<td key={element['lieu']}>{element['lieu']}</td>
<td key={element['nature']}>{element['nature']}</td>
<td key={element['cause']}>{element['cause']}</td>
<td key={element['localisation']}>{element['localisation']}</td>
<td key={element['price']}>{element['price']}</td>
<td key={element['etat_avancement']}>{element['etat_avancement']}</td>
<td key={element['id']}><Link to={'chef-intervention/single/' + element['signalisation_id']} className="btn btn-sm btn-outline-info">View</Link></td>
</tr>
);

return (
<div className="container mt-5">
    <Nav name="Interventions" />
    <div className="row">
        <div className="col-md-12">

        { this.state.all == '' 
   ? <div class="card shadow border-0">
     <h5 class="card-header border-0">Intervention</h5>
     <div class="card-body">
     <h5 class="card-title">la list est vide</h5>
     </div>
     </div>
    :
    <table className="table shadow">
      <thead>
      <tr className="border-top-0">
      <th scope="col">Desc</th>
      <th scope="col">Lieu</th>
      <th scope="col">Nature</th>
      <th scope="col">Cause</th>
      <th scope="col">Localisation</th>
      <th scope="col">Price</th>
      <th scope="col">Etat Avancement</th>
      <th scope="col">View</th>
      </tr>
      </thead>
      <tbody> {all_data} </tbody>
    </table>
    }
        </div>
    </div>
</div>
        );
    }
}