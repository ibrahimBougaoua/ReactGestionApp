import React, { Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';
import Moment from 'moment';

async function all_signalisations() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

function handleCreate(id,price,etat_avancement,date_debut,date_fin)
{
  axios.post('http://127.0.0.1:8000/api/auth/intervention', {
      signalisation_id    : id,
      price    : price,
      etat_avancement    : etat_avancement,
      date_debut    : date_debut,
      date_fin    : date_fin
  }).then(function (response) {
    // setter
    //localStorage.setItem('token', response.data.access_token)
    //localStorage.setItem('id', response.data.user.id)
    //localStorage.setItem('name', response.data.user.name)
    //localStorage.setItem('email', response.data.user.email)
    //localStorage.setItem('role', response.data.user.role)
    // route for profile
    console.log(response)
    window.location.reload();
  }).catch(function (error) {
      console.log(error);
  });
}

export default class Signalisation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {all: [],signalisation_id: '',price: 0,etat_avancement: 'debut',date_debut: '',date_fin: '',select_signalisation: [],all: []};
    
        this.handleChangeSignalisationId = this.handleChangeSignalisationId.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeEtatAvancement = this.handleChangeEtatAvancement.bind(this);
        this.handleChangeDateDebut = this.handleChangeDateDebut.bind(this);
        this.handleChangeDateFin = this.handleChangeDateFin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeSignalisationId(event) {
        this.setState({signalisation_id:  event.target.options[event.target.selectedIndex].value});
      }
    
      handleChangePrice(event) {
        this.setState({price: event.target.value});
      }
    
      handleChangeEtatAvancement(event) {
        this.setState({etat_avancement: event.target.options[event.target.selectedIndex].value});
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
                all: response.data.data
            });
        });
      }
      
      handleCreate(id)
      {
        axios.post('http://127.0.0.1:8000/api/auth/intervention', {
            signalisation_id    : id,
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
          window.location.reload();
        }).catch(function (error) {
            console.log(error);
        });
      }

    render() {

const all_data = this.state.all.map((element) =>
<tr>
<td key={element['desc']}>{element['desc']}</td>
<td key={element['localisation']}>{element['localisation']}</td>
<td key={element['lieu']}>{element['lieu']}</td>
<td key={element['nature']}>{element['nature']}</td>
<td key={element['cause']}>{element['cause']}</td>
<td key={element['created_at']}>{Moment(element['created_at']).format('DD-MM-YYYY')}</td>
<td key={element['id']}><button type="button" className="btn btn-sm btn-outline-success float-right" data-toggle="modal" data-target={'#' + element['id']}>Intervention</button>

<div className="modal fade" id={element['id']} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Nouvelle intervention {element['id']}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            
          <div className="col-md-12">
                  <div className="card border-0 shadow">
                      <div className="card-header border-0 bg-info text-white">Nouvelle intervention</div>
      
                      <div className="card-body">
                          <form method="POST" onSubmit={this.handleSubmit}>
      
      <div className="form-group row">
          <label for="price" className="col-md-5 col-form-label text-md-right">Coût : {this.state.price} DA</label>
          <div className="col-md-6">
              <input id="price" type="range" value={this.state.price} onChange={this.handleChangePrice} className="custom-range" min="0" max="150" name="price" required/>
          </div>
      </div>
      
      <div className="form-group row">
          <label for="etat_avancement" className="col-md-5 col-form-label text-md-right">État d'avancement</label>
          <div className="col-md-6">
          <select class="custom-select custom-select-sm" name="etat_avancement" value={this.state.etat_avancement} onChange={this.handleChangeEtatAvancement}>
              <option value="debut">Debut</option>
              <option value="moyenn">Moyenn</option>
              <option value="avencer">avencer</option>
              <option value="terminer">Terminer</option>
          </select>
          </div>
      </div>
      
      <div className="form-group row">
          <label for="date" className="col-md-5 col-form-label text-md-right">Date Debut</label>
          <div className="col-md-6">
              <input id="date" type="date" value={this.state.date_debut} onChange={this.handleChangeDateDebut} className="form-control" name="date" required/>
          </div>
      </div>
      
      <div className="form-group row">
          <label for="date" className="col-md-5 col-form-label text-md-right">Date Fin</label>
          <div className="col-md-6">
              <input id="date" type="date" value={this.state.date_fin} onChange={this.handleChangeDateFin} className="form-control" name="date" required/>
          </div>
      </div>
      
                              <div className="form-group row mb-0">
                                  <div className="col-md-6 offset-md-5">
                                      <button type="submit" className="btn btn-outline-success float-right" onClick={handleCreate(2,2,2,2,2)}>
                                      Créer une intervention
                                      </button>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
      
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-info" data-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
      </div>






</td>
<td key={element['id']}><Link to={'signale/single/' + element['id']} className="btn btn-sm btn-outline-info">Voire plus</Link></td>
</tr>
);

return (
<div className="container-fluid mt-5">
    <Nav name="Signalisation" />

    <div className="row">
        <div className="col-md-12">

        { this.state.all == '' 
   ? <div class="card shadow border-0">
     <h5 class="card-header border-0">Signalisation</h5>
     <div class="card-body">
     <h5 class="card-title">la list est vide</h5>
     </div>
     </div>
    :
    <table className="table shadow">
      <thead>
      <tr className="border-top-0">
      <th scope="col">Description</th>
      <th scope="col">Localisation</th>
      <th scope="col">Lieu</th>
      <th scope="col">Nature</th>
      <th scope="col">Cause</th>
      <th scope="col">Créé à</th>
      <th scope="col">Intervention</th>
      <th scope="col">Voire plus</th>
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