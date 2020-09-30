import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';
import { Link } from "react-router-dom";
import Moment from 'moment';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))


// handle button click of login form
async function signalisation(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation/' + id);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_Signalisation() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_gest() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_chef(signalisation_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/allChefsHasNoInformer/' + signalisation_id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function allChefsHasInformer(id) {
    try {
      
      const response = await axios({
        method :'GET',
        url :'http://127.0.0.1:8000/api/auth/allChefsHasInformer/' + id,
        headers : {'Accept':'application/json'},
        params : {'token':localStorage.getItem('token')}
      })
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

// handle button click of signin form
function handleUpdate(id,desc,localisation,lieu,nature,cause)
{
  axios.put('http://127.0.0.1:8000/api/auth/signalisation/' + id, {
    desc    : desc,
    localisation    : localisation,
    lieu    : lieu,
    nature    : nature,
    cause    : cause
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

function handleInformer(id,gest_id,chef_id)
{
  axios.post('http://127.0.0.1:8000/api/auth/informer', {
      gest_id	: gest_id,
      chef_id	: chef_id,
      signalisation_id : id
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

function deleteMembre(chef_id,signalisation_id)
{
  axios.delete('http://127.0.0.1:8000/api/auth/deleteChefInformer/' + chef_id + '/signalisation_id/' + signalisation_id)
  .then(function (response) {
    // setter
    //const token = localStorage.setItem('token', response.data.access_token)
    //const user = localStorage.setItem('user', response.data.user)
    // route for profile
    console.log(response)

  }).catch(function (error) {
    console.log('ibrahim => ' + error);
  });

  window.location.reload();
}


export default class Signale extends Component {

constructor(props) {
    super(props);
    this.state = {desc: '',localisation: '',lieu: '',nature: '',cause: '',chef_id: '',name: '',allGest: [],allChef: [],dataEquipe: [],all: [],allUsers: [],HasInformer: [],loading: false,vd: false};

    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeLocalisation = this.handleChangeLocalisation.bind(this);
    this.handleChangeLieu = this.handleChangeLieu.bind(this);
    this.handleChangeNature = this.handleChangeNature.bind(this);
    this.handleChangeCause = this.handleChangeCause.bind(this);
    this.handleChangeChefId = this.handleChangeChefId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDesc(event) {
    this.setState({desc: event.target.value});
    this.setState({vd: true});
  }

  handleChangeLocalisation(event) {
    this.setState({localisation: event.target.value});
    this.setState({vd: true});
  }

  handleChangeLieu(event) {
    this.setState({lieu: event.target.value});
    this.setState({vd: true});
  }

  handleChangeNature(event) {
    this.setState({nature: event.target.value});
    this.setState({vd: true});
  }

  handleChangeCause(event) {
    this.setState({cause: event.target.value});
    this.setState({vd: true});
  }

  handleChangeChefId(event) {
    this.setState({chef_id: event.target.options[event.target.selectedIndex].value});
  }

  handleSubmit(event) {
    console.log('desc : ' + this.state.desc)
    console.log('lieu : ' + this.state.lieu)
    console.log('localisation : ' + this.state.localisation)
    console.log('cause : ' + this.state.cause)
    console.log('nature : ' + this.state.nature)
    this.setState({loading: true});
    event.preventDefault();
  }

      componentDidMount =()=>{
        signalisation(this.props.match.params.id).then(response => {
          this.setState({
            dataSignale: response.data
          });
          this.setState({
            desc: this.state.dataSignale['desc']
          });
          this.setState({
            localisation: this.state.dataSignale['localisation']
          });
          this.setState({
            lieu: this.state.dataSignale['lieu']
          });
          this.setState({
            nature: this.state.dataSignale['nature']
          });
          this.setState({
            cause: this.state.dataSignale['cause']
          });
        });
        all_Signalisation().then(response => {
            this.setState({
                all: response.data
            });
        });
        allChefsHasInformer(this.props.match.params.id).then(response => {
          if(response.data.data != null){
            this.setState({
              HasInformer: response.data.data
            });
          }
        });
        all_chef(this.props.match.params.id).then(response => {
            this.setState({
                allChef: response.data.data
            });
        });
      }

render() {


const delete_signalisation = () => {
  axios.delete('http://127.0.0.1:8000/api/auth/signalisation/' + this.props.match.params.id)
  .then(function (response) {
    // setter
    //const token = localStorage.setItem('token', response.data.access_token)
    //const user = localStorage.setItem('user', response.data.user)
    // route for profile
    console.log(response)

  }).catch(function (error) {
    console.log('ibrahim => ' + error);
  });

  axios.delete('http://127.0.0.1:8000/api/auth/deleteAllSignales/' + this.props.match.params.id)
  .then(function (response) {
    // setter
    //const token = localStorage.setItem('token', response.data.access_token)
    //const user = localStorage.setItem('user', response.data.user)
    // route for profile
    console.log(response)

  }).catch(function (error) {
    console.log('ibrahim => ' + error);
  });

  window.location.replace("/signalisations");
}


const all_datas = this.state.HasInformer.map((element,key) =>
<tr>
<td key={key}>{element.name}</td>
<td key={key}>{element.email}</td>
<td key={key}>{element.telephone}</td>
<td key={key}>{element.sexe}</td>
<td key={key}>{Moment(element.created_at).format('DD-MM-YYYY')}</td>  
<td key={element['id']}>{<button type="button" className="btn btn-sm btn-danger" data-toggle="modal" data-target={'#' + element['id']}>Supprimer</button>}

<div className="modal fade" id={element['id']} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">Supprimer cette membre</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          Êtes-vous sûr ? votre membre sera supprimé !          
          </div>
          <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={() => {deleteMembre(element.id,this.props.match.params.id)}}>Supprimer</button>
            <button type="button" className="btn btn-outline-info" data-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
      </div>

  </td>
</tr>
);

const fetchChef = this.state.allChef.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

return (<div className="container mt-5">
    <Nav name="Signalisation" />
    <div className="row">

    <div className="col-md-6">
        
    <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Mettre à jour signalisation</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="desc" className="col-md-3 col-form-label text-md-right">Description</label>
                            <div className="col-md-9">
                            <textarea id="desc" type="text" onChange={this.handleChangeDesc} className={ this.state.desc == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="desc" required rows="5" value={this.state.desc}></textarea>
                                { this.state.desc == '' && this.state.vd
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                }
                            </div>
                        </div>

<div className="form-group row">
    <label for="localisation" className="col-md-3 col-form-label text-md-right">Localisation</label>
    <div className="col-md-9">
    <div style={{width:'100%',height:'50%'}}>
<MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `200px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
</div>
    </div>
</div>

<div className="form-group row">
        <label for="lieu" className="col-md-3 col-form-label text-md-right">Lieu</label>
        <div className="col-md-9">
        <select name="lieu" class="form-control" value={this.state.lieu} onChange={this.handleChangeLieu}>
          <option value="les 100">Les 100</option>
          <option value="les 200">Les 200</option>
          <option value="faculte electrounique et informatique">Faculte electrounique et informatique</option>
          <option value="Faculte chimique">Faculte chimique</option>
          <option value="Faculte biolougie">Faculte biolougie</option>
          <option value="departement informatique">Departement informatique</option>
          <option value="Faculte phisique">Faculte phisique</option>
          <option value="les Nouveau Bloc">Les Nouveau Bloc</option>
          <option value="Les 300">Les 300</option>
          <option value="village">Village</option>
          <option value="cyper espace">Cyper espace</option>
          <option value="les 400">Les 400</option>
          <option value="Bibliotheque centrale">Bibliotheque centrale</option>
        </select>
        </div>
</div>



<div className="form-group row">
        <label for="nature" className="col-md-3 col-form-label text-md-right">Nature</label>
        <div className="col-md-9">
        <select name="nature" class="form-control" value={this.state.nature} onChange={this.handleChangeNature}>
          <option value="l'eaux">L'eaux</option>
          <option value="décheat">Décheat</option>
          <option value="electricité">Electricité</option>
          <option value="clairage">Clairage</option>
        </select>
        </div>
</div>


<div className="form-group row">
        <label for="cause" className="col-md-3 col-form-label text-md-right">Cause</label>
        <div className="col-md-9">
        <select name="cause" class="form-control" value={this.state.cause} onChange={this.handleChangeCause}>
          <option value="travaille arretes">Travaille arretes</option>
          <option value="aucune travaille">Aucune travaille</option>
          <option value="besoin d'aide">Besoin d'aide</option>
          <option value="déja signales et aucune travaille">Déja signales et aucune travaille</option>
        </select>
        </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-3">
                              <button type="submit" className="btn btn-info" onClick={() => {handleUpdate(this.props.match.params.id,this.state.desc,this.state.localisation,this.state.lieu,this.state.nature,this.state.cause)}} >Mettre à jour</button>
                            <button type="button" className="btn btn-danger float-right" data-toggle="modal" data-target="#exampleModalCenter">Supprimer</button>
                            </div>
                            
                        
<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Supprimer cette signalisation</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      Êtes-vous sûr ? Cette signalisation sera supprimée et vous ne pourrez plus la voir!
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={delete_signalisation}>Supprimer</button>
        <button type="button" className="btn btn-info" data-dismiss="modal">Fermer</button>
      </div>
    </div>
  </div>
</div>
                        
                        
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Informer</div>

                <div className="card-body">

                <img src="/sent_messages_.png" className="w-100 h-100 p-2 mb-5" alt=""/>

                    <form method="POST" onSubmit={this.handleSubmit}>

                    <div className="form-group row">
                            <label for="name" className="col-md-2 col-form-label text-md-right">Chefs</label>
                            <div className="col-md-10">
                              <select class="custom-select custom-select-sm" name="chef_id" value={this.state.chef_id} onChange={this.handleChangeChefId}>{fetchChef}</select>                           
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-12 ml-3">
                              <button type="submit" className="btn btn-info" onClick={() => {handleInformer(this.props.match.params.id,localStorage.getItem('id'),this.state.chef_id)}}>Informer</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>


        </div>


        <div className="row">    
        <div className="col-md-12 mt-4">
    
        <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Tous les membres qui ont été ajoutés</div>

                <div className="card-body">
{all_datas != "" ? 
<table className="table shadow">
  <thead>
    <tr className="border-top-0">
      <th scope="col">Nom</th>
      <th scope="col">E-mail</th>
      <th scope="col">Téléphone</th>
      <th scope="col">Sexe</th>
      <th scope="col">Créé le</th>
      <th scope="col">Supprimer</th>
    </tr>
  </thead>
  <tbody>
  {all_datas} 
  </tbody>
</table>
 : null }

{all_datas != "" ? null : <div class="row"><div class="col-md-7"><img src="/user_group.png" className="w-75 h-75 p-2 m-2" alt=""/></div><div class="col-md-5"><h1 class="load text-info text-sm">Pardon la liste est vide</h1></div></div>} 


</div>
        </div>
        </div>
    
    </div>

</div>
);
}

}