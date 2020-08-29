import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';
import { Link } from "react-router-dom";

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

async function all_chef() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/showuerbyrole/interventionteam')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function HasInformer(id) {
    try {
      
      const response = await axios({
        method :'GET',
        url :'http://127.0.0.1:8000/api/auth/ifinformer/'+id,
        headers : {'Accept':'application/json'},
        params : {'token':localStorage.getItem('token')}
      })
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
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
        HasInformer(this.props.match.params.id).then(response => {
          if(response.data != ""){
            this.setState({
              HasInformer: response.data
            });
          }
        });
        all_chef().then(response => {
            this.setState({
                allChef: response.data.data
            });
        });
      }

render() {

// handle button click of signin form
const handleUpdate = () => {
    axios.put('http://127.0.0.1:8000/api/auth/signalisation/' + this.props.match.params.id, {
      desc    : this.state.desc,
      localisation    : this.state.localisation,
      lieu    : this.state.lieu,
      nature    : this.state.nature,
      cause    : this.state.cause
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
}

// handle button click of signin form
const handleInformer = () => {
    axios.post('http://127.0.0.1:8000/api/auth/informer', {
        gest_id	: localStorage.getItem('id'),
        chef_id	: this.state.chef_id,
        signalisation_id : this.props.match.params.id
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

const all_datas = this.state.HasInformer.map((element,key) =>
<tr>
<td key={key}>{element.name}</td>
<td key={key}>{element.email}</td>
<td key={key}>{element.telephone}</td>
<td key={key}>{element.sexe}</td>
<td key={key}>{element.created_at}</td>
<td key={key}><Link to={'/user/single/' + element.id} className="btn btn-sm btn-outline-info">View</Link></td>
</tr>
);

const fetchChef = this.state.allChef.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

return (<div className="container mt-5">
    <Nav name="Single Equipe" />
    <div className="row">
        
    <div className="col-md-6">
        
    <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Update signalisation</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="desc" className="col-md-4 col-form-label text-md-right">desc</label>
                            <div className="col-md-8">
                                <input id="desc" type="text" value={this.state.desc} onChange={this.handleChangeDesc} className={ this.state.desc == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="desc" required/>
                                { this.state.desc == '' && this.state.vd
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                }
                            </div>
                        </div>

<div className="form-group row">
    <label for="localisation" className="col-md-4 col-form-label text-md-right">Localisation</label>
    <div className="col-md-8">
        <input id="localisation" type="text" value={this.state.localisation} onChange={this.handleChangeLocalisation} className={ this.state.localisation == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="localisation" required/>
        { this.state.localisation == '' && this.state.vd
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        }
    </div>
</div>

<div className="form-group row">
    <label for="lieu" className="col-md-4 col-form-label text-md-right">Lieu</label>
    <div className="col-md-8">
        <input id="lieu" type="text" value={this.state.lieu} onChange={this.handleChangeLieu} className={ this.state.lieu == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="lieu" required/>
        { this.state.lieu == '' && this.state.vd
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        }
    </div>
</div>

<div className="form-group row">
    <label for="nature" className="col-md-4 col-form-label text-md-right">Nature</label>
    <div className="col-md-8">
        <input id="nature" type="text" value={this.state.nature} onChange={this.handleChangeNature} className={ this.state.nature == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="nature" required/>
        { this.state.nature == '' && this.state.vd
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        }
    </div>
</div>

<div className="form-group row">
    <label for="cause" className="col-md-4 col-form-label text-md-right">Cause</label>
    <div className="col-md-8">
        <input id="cause" type="text" value={this.state.cause} onChange={this.handleChangeCause} className={ this.state.cause == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="cause" required/>
        { this.state.cause == '' && this.state.vd
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        }
    </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                            { this.state.loading
                                ? <button type="submit" className="btn btn-outline-info" disabled>Updated... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                : <button type="submit" className="btn btn-outline-info" onClick={handleUpdate} >Update</button>
                            }
                            </div>
                            <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModalCenter">Delete</button>
                            
                        
                            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Delete you'r signalisation</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      Are you sure ? you'r signalisation will deleted and you can't see any details ! 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-danger" onClick={delete_signalisation}>Delete</button>
        <button type="button" className="btn btn-outline-info" data-dismiss="modal">Close</button>
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

                <img src="/undraw_business_decisions_gjwy.svg" className="w-75 h-50 p-2" alt=""/>

                    <form method="POST" onSubmit={this.handleSubmit}>

                    <div className="form-group row">
                            <label for="name" className="col-md-2 col-form-label text-md-right">Chefs</label>
                            <div className="col-md-10">
                              <select class="custom-select custom-select-sm" name="chef_id" value={this.state.chef_id} onChange={this.handleChangeChefId}>{fetchChef}</select>                           
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-12 ml-3">
                              <button type="submit" className="btn btn-outline-info" onClick={handleInformer}>Informer</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>


        </div>

        <div className="row">    
        <div className="col-md-12 mt-4">
    
<table className="table shadow">
  <thead>
    <tr className="border-top-0">
      <th scope="col">Name</th>
      <th scope="col">E-mail</th>
      <th scope="col">Telephone</th>
      <th scope="col">Sexe</th>
      <th scope="col">Created at</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
  {all_datas}
  </tbody>
</table>

        </div>
    
    </div>

</div>
);
}

}