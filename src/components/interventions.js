import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';

async function all_signalisations() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_interventions() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/intervention')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Interventions extends Component {
    
    constructor(props) {
        super(props);
        this.state = {signalisation_id: '',price: '',etat_avancement: '',date_debut: '',date_fin: '',select_signalisation: [],all: []};
    
        this.handleChangeSignalisationId = this.handleChangeSignalisationId.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeEtatAvancement = this.handleChangeEtatAvancement.bind(this);
        this.handleChangeDateDebut = this.handleChangeDateDebut.bind(this);
        this.handleChangeDateFin = this.handleChangeDateFin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeSignalisationId(event) {
        this.setState({signalisation_id:  event.target.options[event.target.selectedIndex].text});
      }
    
      handleChangePrice(event) {
        this.setState({price: event.target.value});
      }
    
      handleChangeEtatAvancement(event) {
        this.setState({etat_avancement: event.target.options[event.target.selectedIndex].text});
      }

      handleChangeDateDebut(event) {
        this.setState({date_debut: event.target.value});
      }

      handleChangeDateFin(event) {
        this.setState({date_fin: event.target.value});
      }

      handleSubmit(event) {
        console.log('Sinialisation : ' + this.state.signalisation_id);
        console.log('Price : ' + this.state.price);
        console.log('Etat avancement : ' + this.state.etat_avancement);
        console.log('Date Debut : ' + this.state.date_debut);
        console.log('Date Fin : ' + this.state.date_fin);
        event.preventDefault();
      }

      componentDidMount = () => {
        all_signalisations().then(response => {
            this.setState({
                select_signalisation: response.data.data
            });
        });
        all_interventions().then(response => {
            this.setState({
                all: response.data
            });
        });
      }

    render() {

// handle button click of signin form
const handleCreate = () => {
    axios.post('http://127.0.0.1:8000/api/auth/intervention', {
        signalisation_id    : this.state.signalisation_id,
        price    : this.state.price,
        etat_avancement    : this.state.etat_avancement,
        date_debut    : this.state.date_debut,
        date_fin    : this.state.date_fin
    }).then(function (response) {
      // setter
      //localStorage.setItem('token', response.data.access_token)
      //localStorage.setItem('id', response.data.user.id)
      //localStorage.setItem('name', response.data.user.name)
      //localStorage.setItem('email', response.data.user.email)
      //localStorage.setItem('role', response.data.user.role)
      // route for profile
      console.log(response)
    }).catch(function (error) {
        console.log(error);
    });
}

const all_data = this.state.all.map((element) =>
<tr>
<td key={element['signalisation_id']}>{element['signalisation_id']}</td>
<td key={element['price']}>{element['price']}</td>
<td key={element['etat_avancement']}>{element['etat_avancement']}</td>
<td key={element['id']}><Link to={'intervention/single/' + element['signalisation_id']} className="btn btn-sm btn-outline-info">Voir plus</Link></td>
</tr>
);

const select_data = this.state.select_signalisation.map((element) =>
<option value={element['id']}>{element['nature']}</option>
);

return (
<div className="container mt-5">
    <Nav name="Intervention" />
    <div className="row">
    <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Nouvelle intervention</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">Signalisations</label>
                            <div className="col-md-8">
                            <select class="custom-select custom-select-sm" name="signalisation_id" value={this.state.signalisation_id} onChange={this.handleChangeSignalisationId}>
                            {select_data == '' ? <option value="0">No Signalisation</option> : select_data }
                            </select>
                            </div>
                        </div>

<div className="form-group row">
    <label for="price" className="col-md-4 col-form-label text-md-right">Prix</label>
    <div className="col-md-8">
        <input id="price" type="range" value={this.state.price} onChange={this.handleChangePrice} className="custom-range" min="0" max="150" name="price" required/>
    </div>
</div>

<div className="form-group row">
    <label for="etat_avancement" className="col-md-4 col-form-label text-md-right">État d'avancement</label>
    <div className="col-md-8">
    <select class="custom-select custom-select-sm" name="etat_avancement" value={this.state.etat_avancement} onChange={this.handleChangeEtatAvancement}>
        <option value="debut">Debut</option>
        <option value="moyenn">Moyenn</option>
        <option value="avencer">avencer</option>
        <option value="terminer">Terminer</option>
    </select>
    </div>
</div>

<div className="form-group row">
    <label for="date" className="col-md-4 col-form-label text-md-right">Date Debut</label>
    <div className="col-md-8">
        <input id="date" type="date" value={this.state.date_debut} onChange={this.handleChangeDateDebut} className="form-control" name="date" required/>
    </div>
</div>

<div className="form-group row">
    <label for="date" className="col-md-4 col-form-label text-md-right">Date Fin</label>
    <div className="col-md-8">
        <input id="date" type="date" value={this.state.date_fin} onChange={this.handleChangeDateFin} className="form-control" name="date" required/>
    </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-outline-info" onClick={handleCreate}>
                                Créer une intervention
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="col-md-6">


        { this.state.all == '' 
   ? <div class="card shadow border-0">
     <h5 class="card-header border-0 bg-info text-white">Intervention</h5>
     <div class="card-body">
     <h5 class="card-title">la list est vide</h5>
     </div>
     </div>
    :
    <table className="table shadow">
      <thead>
      <tr className="border-top-0">
      <th scope="col">#ID Signalisation</th>
      <th scope="col">Prix</th>
      <th scope="col">État d'avancement</th>
      <th scope="col">Voir plus</th>
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