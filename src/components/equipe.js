import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';
import { Link } from "react-router-dom";

// handle button click of login form
async function equipeMembreById(id) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/equipemembrebyid/' + id);
    //console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

// handle button click of login form
async function equipe(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipe/' + id);
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_equipes() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipe')
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_ats() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/allAtssHasNoInvitationInTeam')
    //console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

function handleTeamUpdate(id,_d_f_equipe,_mail,_telephone)
{
  axios.put('http://127.0.0.1:8000/api/auth/equipe/' + id, {
    d_f_equipe    : _d_f_equipe,
    mail    : _mail,
    telephone    : _telephone
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

function handleAddMembre(member_id,id)
{
  axios.post('http://127.0.0.1:8000/api/auth/membre', {
      user_id    : member_id,
      equipe_id    : id
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

function deleteMembre(user_id)
{
  axios.delete('http://127.0.0.1:8000/api/auth/membre/' + user_id)
  .then(function (response) {
    // setter
    //const token = localStorage.setItem('token', response.data.access_token)
    //const user = localStorage.setItem('user', response.data.user)
    // route for profile
    console.log(response)
    window.location.reload();
  }).catch(function (error) {
    console.log('ibrahim => ' + error);
  });
}

export default class Single extends Component {

constructor(props) {

    super(props);
    this.state = {d_f_equipe: '',mail: '',telephone: '',chef_id: 0,dataEquipe: [],all: [],membresIds: [],membres: [],member_id: 0,allUsers: [],getUserMembreByIds: [],dataUser: [],chef: '',allEquipeMembreById: [],loadingUpdate: false,loadingAddMembre: false,vd: false};

    this.handleChanged_f_equipe = this.handleChanged_f_equipe.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeTelephone = this.handleChangeTelephone.bind(this);
    this.handleChangeMemeber = this.handleChangeMemeber.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChanged_f_equipe(event) {
    this.setState({d_f_equipe: event.target.value});
    this.setState({vd: true});
  }

  handleChangeEmail(event) {
    this.setState({mail: event.target.value});
    this.setState({vd: true});
  }

  handleChangeTelephone(event) {
    this.setState({telephone: event.target.value});
    this.setState({vd: true});
  }

  handleChangeMemeber(event) {
    this.setState({member_id: event.target.options[event.target.selectedIndex].value});
    console.log(this.state.member_id);
  }

  handleSubmit(event) {
    this.setState({loadingUpdate: true});
    event.preventDefault();
  }

      componentDidMount =()=>{
        
        equipe(this.props.match.params.id).then(response => {
          this.setState({
            dataEquipe: response.data
          });
          this.setState({
            d_f_equipe: this.state.dataEquipe.d_f_equipe
          });
          this.setState({
            mail: this.state.dataEquipe.mail
          });
          this.setState({
            telephone: this.state.dataEquipe.telephone
          });
          this.setState({
            name: this.state.dataEquipe.name
          });
          this.setState({
            chef_id: this.state.dataEquipe.chef_id
          });
        });
        equipeMembreById(this.props.match.params.id).then(response => {
          this.setState({
            allEquipeMembreById: response.data
          });
        });
        all_equipes().then(response => {
            this.setState({
                all: response.data
            });
        });
        all_ats().then(response => {
          this.setState({
              allUsers: response.data.data
          });
        });

      }

render() {

const delete_equipe = () => {
  axios.delete('http://127.0.0.1:8000/api/auth/deleteAllMembre/' + this.props.match.params.id)
  .then(function (response) {
    // setter
    //const token = localStorage.setItem('token', response.data.access_token)
    //const user = localStorage.setItem('user', response.data.user)
    // route for profile
    console.log(response)

  }).catch(function (error) {
    console.log('ibrahim => ' + error);
  });
  
  axios.delete('http://127.0.0.1:8000/api/auth/equipe/' + this.props.match.params.id)
  .then(function (response) {
    // setter
    //const token = localStorage.setItem('token', response.data.access_token)
    //const user = localStorage.setItem('user', response.data.user)
    // route for profile
    console.log(response)
    window.location.replace("/equipes");
  }).catch(function (error) {
    console.log('ibrahim => ' + error);
  });
  
  
}

const all_datas = this.state.allEquipeMembreById.map((element,key) =>
<tr>
<td key={key}>{element.name}</td>
<td key={key}>{element.email}</td>
<td key={key}>{element.telephone}</td>
<td key={key}>{element.sexe}</td>
<td key={key}>{element.created_at}</td>
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
        <button type="button" className="btn btn-danger" onClick={() => {deleteMembre(element['id'])}}>Supprimer</button>
            <button type="button" className="btn btn-outline-info" data-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
      </div>

  </td>
</tr>
);

const all_data_users = this.state.allUsers.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

return (<div className="container mt-5">
    <Nav name="Voir l'équipe" />
    <div className="row">
    <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Mettre à jour l'équipe</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">D f equipe</label>
                            <div className="col-md-8">
                                <input id="name" type="text" onChange={this.handleChanged_f_equipe} className={ this.state.dataEquipe.d_f_equipe == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="d_f_equipe" value={this.state.d_f_equipe} required/>
                                { this.state.dataEquipe.d_f_equipe == '' && this.state.vd
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                }
                            </div>
                        </div>

<div className="form-group row">
    <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
    <div className="col-md-8">
        <input id="email" type="email" onChange={this.handleChangeEmail} className={ this.state.dataEquipe.mail == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="email" value={this.state.mail} required/>
        { this.state.dataEquipe.mail == '' && this.state.vd
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        }
    </div>
</div>

<div className="form-group row">
    <label for="telephone" className="col-md-4 col-form-label text-md-right">Téléphone</label>
    <div className="col-md-8">
        <input id="telephone" type="text" onChange={this.handleChangeTelephone} className={ this.state.dataEquipe.telephone == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="telephone" value={this.state.telephone}/>
        { this.state.dataEquipe.telephone == '' && this.state.vd
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        }
    </div>
</div>

<div className="form-group row">
    <label for="chef" className="col-md-4 col-form-label text-md-right">Chef</label>
    <div className="col-md-8">    
  <fieldset disabled>
        <input id="chef" type="text" className="form-control" name="chef" value={this.state.name}/>
  </fieldset>
    </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                              <button type="submit" className="btn btn-success float-left" onClick={() => {handleTeamUpdate(this.props.match.params.id,this.state.d_f_equipe,this.state.mail,this.state.telephone,)}} >Mettre à jour</button>
                              <button type="button" className="btn btn-danger float-right" data-toggle="modal" data-target="#exampleModalCenter">Supprimer</button>
                            </div>

                            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Supprimer cette équipe</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      Êtes-vous sûr ? Cette équipe sera supprimée et vous ne pourrez plus la voir!
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-danger" onClick={delete_equipe}>Supprimer</button>
        <button type="button" className="btn btn-outline-info" data-dismiss="modal">Fermer</button>
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
                <div className="card-header border-0 bg-info text-white">Ajouter un membre à l'équipe</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                          
                        <div className="col-md-12">
                        <select class="custom-select" size="8" name="member_id" value={this.state.member_id} onChange={this.handleChangeMemeber}>
                        {all_data_users}
                        </select>
                        </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6">
                                { this.state.member_id != 0
                                ? <button type="submit" className="btn btn-success" onClick={() => {handleAddMembre(this.state.member_id,this.props.match.params.id)}}>Ajouter un membre</button>
                                : <p className="btn btn-secondary">Sélectionnez un membre</p>
                                }
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
                <div className="card-header border-0 bg-info text-white">Membres de l'équipe</div>

                <div className="card-body">
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

</div>
        </div>
        </div>
    
    </div>
</div>
);
}

}