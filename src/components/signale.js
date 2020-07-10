import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';

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
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function HasInformer(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/informer/' + id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Signale extends Component {

constructor(props) {
    super(props);
    this.state = {desc: '',localisation: '',lieu: '',nature: '',cause: '',gest_id: '',chef_id: '',allGest: [],allChef: [],dataEquipe: [],all: [],allUsers: [],HasInformerVf: []};

    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeLocalisation = this.handleChangeLocalisation.bind(this);
    this.handleChangeLieu = this.handleChangeLieu.bind(this);
    this.handleChangeNature = this.handleChangeNature.bind(this);
    this.handleChangeCause = this.handleChangeCause.bind(this);
    this.handleChangeGestId = this.handleChangeGestId.bind(this);
    this.handleChangeChefId = this.handleChangeChefId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDesc(event) {
    this.setState({desc: event.target.value});
  }

  handleChangeLocalisation(event) {
    this.setState({localisation: event.target.value});
  }

  handleChangeLieu(event) {
    this.setState({lieu: event.target.value});
  }

  handleChangeNature(event) {
    this.setState({nature: event.target.value});
  }

  handleChangeCause(event) {
    this.setState({cause: event.target.value});
  }

  handleChangeGestId(event) {
    this.setState({gest_id: event.target.options[event.target.selectedIndex].text});
  }

  handleChangeChefId(event) {
    this.setState({chef_id: event.target.options[event.target.selectedIndex].text});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

      componentDidMount =()=>{
        signalisation(this.props.match.params.id).then(response => {
          this.setState({
            dataEquipe: response.data
          });
        });
        all_Signalisation().then(response => {
            this.setState({
                all: response.data
            });
        });
        HasInformer(this.props.match.params.id).then(response => {
            this.setState({
              HasInformerVf: response.data
            });
        });
        all_gest().then(response => {
            this.setState({
                allGest: response.data
            });
        });
        all_chef().then(response => {
            this.setState({
                allChef: response.data
            });
        });
      }

render() {


// handle button click of signin form
const handleUpdate = () => {
    axios.post('http://127.0.0.1:8000/api/auth/signalisation', {
        desc    : this.state.desc,
        localisation    : this.state.localisation,
        lieu    : this.state.lieu,
        nature    : this.state.nature,
        cause    : this.state.cause,
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
        gest_id	: this.state.gest_id,
        chef_id	: this.state.chef_id,
        signalisation_id : this.state.signalisation_id
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

const fetchGest = this.state.allGest.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

const fetchChef = this.state.allChef.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

return (<div className="container mt-5">
    <Nav name="Single Equipe" />
    <div className="row">
        
    <div className="col-md-6">
        
    <div className="card border-0 shadow">
                <div className="card-header border-0">Update signalisation</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="desc" className="col-md-4 col-form-label text-md-right">desc</label>
                            <div className="col-md-8">
                                <input id="desc" type="text" value={this.state.dataEquipe['desc']} onChange={this.handleChangeDesc} className="form-control" name="desc" required/>
                            </div>
                        </div>

<div className="form-group row">
    <label for="localisation" className="col-md-4 col-form-label text-md-right">Localisation</label>
    <div className="col-md-8">
        <input id="localisation" type="text" value={this.state.dataEquipe['localisation']} onChange={this.handleChangeLocalisation} className="form-control" name="localisation" required/>
    </div>
</div>

<div className="form-group row">
    <label for="lieu" className="col-md-4 col-form-label text-md-right">Lieu</label>
    <div className="col-md-8">
        <input id="lieu" type="text" value={this.state.dataEquipe['lieu']} onChange={this.handleChangeLieu} className="form-control" name="lieu" required/>
    </div>
</div>

<div className="form-group row">
    <label for="nature" className="col-md-4 col-form-label text-md-right">Nature</label>
    <div className="col-md-8">
        <input id="nature" type="text" value={this.state.dataEquipe['nature']} onChange={this.handleChangeNature} className="form-control" name="nature" required/>
    </div>
</div>

<div className="form-group row">
    <label for="cause" className="col-md-4 col-form-label text-md-right">Cause</label>
    <div className="col-md-8">
        <input id="cause" type="text" value={this.state.dataEquipe['cause']} onChange={this.handleChangeCause} className="form-control" name="cause" required/>
    </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-outline-info" onClick={handleUpdate}>
                                    Update Signalisation
                                </button>
                            </div>
                            <button type="button" className="btn btn-outline-danger" onClick={delete_signalisation}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Informer</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                    <div className="form-group row">
                    <div className="col-md-8">
                    <p class="text-left">Left aligned text on all viewport sizes.</p>
                    <p class="text-left">Left aligned text on all viewport sizes.</p>
                    <p class="text-left">Left aligned text on all viewport sizes.</p>
                    </div>
                    </div>

                    <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">Gestionnaire</label>
                            <div className="col-md-8">
                            <select class="custom-select custom-select-sm" name="gest_id" value={this.state.gest_id} onChange={this.handleChangeGestId}>
                            {fetchGest}
                            </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">Chefs</label>
                            <div className="col-md-8">
                            <select class="custom-select custom-select-sm" name="chef_id" value={this.state.chef_id} onChange={this.handleChangeChefId}>
                            {fetchChef}
                            </select>
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                            {
                            this.state.HasInformerVf == []
                            ? <button type="submit" className="btn btn-outline-info" onClick={handleInformer}>Informer</button>
                            : <button type="submit" className="btn btn-outline-success">Informer</button>
                            }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        </div>

</div>
);
}

}