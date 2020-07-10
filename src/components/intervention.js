import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';

// handle button click of login form
async function getIntervention(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/intervention/' + id);
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_signalisations() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation')
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_chef() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user')
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function evaluer(intervention_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/evaluer/' + intervention_id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Intervention extends Component {

constructor(props) {
    super(props);    
    this.state = {signalisation_id: '',price: '',etat_avancement: '',date_debut: '',date_fin: '',chef_id: '',dataIntervention: [],select_signalisation: [],all: [],evaluers: [],chefs_ids: [],allChef: []};
    
    this.handleChangeSignalisation_id = this.handleChangeSignalisation_id.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeEtatAvancement = this.handleChangeEtatAvancement.bind(this);
    this.handleChangeDateDebut = this.handleChangeDateDebut.bind(this);
    this.handleChangeDateFin = this.handleChangeDateFin.bind(this);
    this.handleChangeChefId = this.handleChangeChefId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeSignalisation_id(event) {
    this.setState({signalisation_id: event.target.value});
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

  handleChangeChefId(event) {
    this.setState({chef_id: event.target.options[event.target.selectedIndex].text});
  }

  handleSubmit(event) {
      console.log('chef : ' + this.state.chef_id);
    event.preventDefault();
  }

      componentDidMount = () => {
        getIntervention(this.props.match.params.id).then(response => {
            this.setState({
                dataIntervention: response.data
            });
            this.setState({
              signalisation_id: this.state.dataIntervention['signalisation_id']
            });
            this.setState({
              price: this.state.dataIntervention['price']
            });
            this.setState({
              etat_avancement: this.state.dataIntervention['etat_avancement']
            });
            this.setState({
              date_debut: this.state.dataIntervention['date_debut']
            });
            this.setState({
              date_fin: this.state.dataIntervention['date_fin']
            });
        });
        all_signalisations().then(response => {
            this.setState({
                select_signalisation: response.data
            });
        });
        all_chef().then(response => {
            this.setState({
                allChef: response.data
            });
        });

        evaluer(3).then(response => {
            this.setState({
                evaluers: response.data
            });
        });

        const ids = [];
        this.state.evaluers.map((id) =>
        ids.push(id['user_id'])
        );

        console.log(this.state.evaluers['user_id']);
        this.setState({
            chefs_ids: ids
        });
          
      }

render() {

// handle button click of signin form
const handleUpdate = () => {
    axios.put('http://127.0.0.1:8000/api/auth/intervention/' + this.props.match.params.id, {
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

// handle button click of signin form
const handleEvaluer  = () => {
    axios.post('http://127.0.0.1:8000/api/auth/evaluer', {
        user_id	: this.state.chef_id,
        intervention_id : 3
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

const delete_intervention = () => {
  axios.delete('http://127.0.0.1:8000/api/auth/intervention/' + this.props.match.params.id)
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

const fetch_signalisation = this.state.select_signalisation.map((element) =>
<option value={element['id']}>{element['id']}</option>
);

const fetchChef = this.state.allChef.map((element) =>
<option value={element['id']}>{element['id']}</option>
);

return (<div className="container mt-5">
    <Nav name="Intervention" />
    <div className="row">

    <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Update Intervention</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">Signalisations</label>
                            <div className="col-md-8">
                            <select class="custom-select custom-select-sm" name="signalisation_id" value={this.state.signalisation_id} onChange={this.handleChangeSignalisation_id}>
                            {fetch_signalisation}
                            </select>
                            </div>
                        </div>

<div className="form-group row">
    <label for="price" className="col-md-4 col-form-label text-md-right">Price</label>
    <div className="col-md-8">
        <input id="price" type="range" value={this.state.price} onChange={this.handleChangePrice} className="custom-range" min="0" max="150" name="price" required/>
    </div>
</div>

<div className="form-group row">
    <label for="etat_avancement" className="col-md-4 col-form-label text-md-right">Etat avancement</label>
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
                                <button type="submit" className="btn btn-outline-info" onClick={handleUpdate}>
                                Update Intervention
                                </button>
                            </div>
                            <button type="button" className="btn btn-outline-danger" onClick={delete_intervention}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



        <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Évaluer</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-2 col-form-label text-md-right">Chefs</label>
                            <div className="col-md-10">
                            <select class="custom-select custom-select-sm" name="chef_id" value={this.state.chef_id} onChange={this.handleChangeChefId}>
                            {fetchChef}
                            </select>
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-12 ml-3">
                                <button type="submit" className="btn btn-outline-info" onClick={handleEvaluer}>
                                Évaluer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    <div className="col-md-6">
        </div>

    
    </div>
</div>
);
}

}