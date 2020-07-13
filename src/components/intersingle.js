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

async function getChefByID(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user/' + id)
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class InterSingle extends Component {

constructor(props) {
    super(props);    
    this.state = {signalisation_id: '',price: '',etat_avancement: '',date_debut: '',date_fin: '',name: '',chef_id: '',dataIntervention: [],select_signalisation: [],all: [],evaluers: [],chefs_ids: [],allChef: [],hasEvaluer: false};
    
    this.handleChangeEtatAvancement = this.handleChangeEtatAvancement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEtatAvancement(event) {
    this.setState({etat_avancement: event.target.options[event.target.selectedIndex].value});
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
        etat_avancement    : this.state.etat_avancement
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
        intervention_id : this.props.match.params.id
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

const fetch_signalisation = this.state.select_signalisation.map((element) =>
<option value={element['id']}>{element['desc']}</option>
);

const fetchChef = this.state.allChef.map((element) =>
<option value={element['id']}>{element['name']}</option>
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
                            <label for="name" className="col-md-4 col-form-label text-md-right">Signalisation</label>
                            <div className="col-md-8">
                            <fieldset disabled>
                            <select class="custom-select custom-select-sm" name="signalisation_id" value={this.state.signalisation_id}>
                            {fetch_signalisation}
                            </select>
                            </fieldset>
                            </div>
                        </div>

<div className="form-group row">
    <label for="price" className="col-md-4 col-form-label text-md-right">Price</label>
    <div className="col-md-8">
    <fieldset disabled>
        <input id="price" type="range" value={this.state.price} className="custom-range" min="0" max="150" name="price" required/>
    </fieldset>
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
    <fieldset disabled>
        <input id="date" type="date" value={this.state.date_debut} className="form-control" name="date" required/>
    </fieldset>
    </div>
</div>

<div className="form-group row">
    <label for="date" className="col-md-4 col-form-label text-md-right">Date Fin</label>
    <div className="col-md-8">
    <fieldset disabled>
        <input id="date" type="date" value={this.state.date_fin} className="form-control" name="date" required/>
    </fieldset>
    </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-outline-info" onClick={handleUpdate}>
                                Update Intervention
                                </button>
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