import React from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';
import axios from 'axios';

function List(props){
    return ( props.elements.map((element) => 
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
                                      <button type="submit" className="btn btn-outline-success float-right" onClick={
                                        axios.post('http://127.0.0.1:8000/api/auth/intervention', {
                                          signalisation_id    : element['id'],
                                          price    : this.state.price,
                                          etat_avancement    : this.state.etat_avancement,
                                          date_debut    : this.state.date_debut,
                                          date_fin    : this.state.date_fin
                                      }).then(function (response) {
                                        console.log(response)
                                        window.location.reload();
                                      }).catch(function (error) {
                                          console.log(error);
                                      })}>
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


));

}

export default List;