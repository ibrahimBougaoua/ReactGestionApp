import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';

async function all_equipes() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/equipe')
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function all_users() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Equipe extends Component {
    
    constructor(props) {
        super(props);
        this.state = {d_f_equipe: '',mail: '',telephone: '',chef: 0,all: [],allUsers: []};
    
        this.handleChanged_f_equipe = this.handleChanged_f_equipe.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeTelephone = this.handleChangeTelephone.bind(this);
        this.handleChangeChef = this.handleChangeChef.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChanged_f_equipe(event) {
        this.setState({d_f_equipe: event.target.value});
      }
    
      handleChangeEmail(event) {
        this.setState({mail: event.target.value});
      }
    
      handleChangeTelephone(event) {
        this.setState({telephone: event.target.value});
      }
      
      handleChangeChef(event) {
        this.setState({chef: event.target.options[event.target.selectedIndex].value});
        console.log(this.state.chef);
      }

      handleSubmit(event) {
        event.preventDefault();
      }

      componentDidMount = () => {
        all_equipes().then(response => {
            this.setState({
                all: response.data
            });
        });
        all_users().then(response => {
            this.setState({
                allUsers: response.data
            });
        });
      }
      
    render() {

// handle button click of signin form
const handleSignin = () => {
    axios.post('http://127.0.0.1:8000/api/auth/equipe', {
        d_f_equipe    : this.state.d_f_equipe,
        mail    : this.state.mail,
        telephone    : this.state.telephone,
        chef_equipe : 4
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
<td key={element['d_f_equipe']}>{element['d_f_equipe']}</td>
<td key={element['mail']}>{element['mail']}</td>
<td key={element['id']}><Link to={'equipe/single/' + element['id']} className="btn btn-sm btn-outline-info">View</Link></td>
</tr>
);

const fetchUsers = this.state.allUsers.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

return (
<div className="container mt-5">
    <Nav name="Equipe" />
    <div className="row">
    <div className="col-md-5">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Create Equipe</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">d f equipe</label>
                            <div className="col-md-8">
                                <input id="name" type="text" value={this.state.d_f_equipe} onChange={this.handleChanged_f_equipe} className="form-control" name="name" required/>
                            </div>
                        </div>

<div className="form-group row">
    <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
    <div className="col-md-8">
        <input id="email" type="email" value={this.state.mail} onChange={this.handleChangeEmail} className="form-control" name="email" required/>
    </div>
</div>

<div className="form-group row">
    <label for="telephone" className="col-md-4 col-form-label text-md-right">Telephone</label>
    <div className="col-md-8">
        <input id="telephone" type="text" value={this.state.telephone} onChange={this.handleChangeTelephone} className="form-control" name="telephone" required/>
    </div>
</div>

<div className="form-group row">
        <label for="name" className="col-md-4 col-form-label text-md-right">Chef d'equipe</label>
        <div className="col-md-8">
        <select name="chef" class="custom-select custom-select-sm" value={this.state.chef} onChange={this.handleChangeChef}>
        <option value="0">chef d'equipe</option>
        {fetchUsers}
        </select>
        </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-info" onClick={handleSignin}>
                                    Create Equipe
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="col-md-7">
        <table className="table shadow">
  <thead>
    <tr className="border-top-0">
      <th scope="col">domaine fonctionnement équipe</th>
      <th scope="col">E-mail</th>
      <th scope="col">View</th>
    </tr>
  </thead>
  <tbody>
  {all_data}
  </tbody>
</table>
        </div>
    </div>
</div>
        );
    }
}