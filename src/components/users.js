import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';

export default class User extends Component {
    
    constructor(props) {
        super(props);
        this.state = {name: '',email: '',password: '',sexe: '',telephone: '',role: 'etudiant'};
    
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        //this.handleChangeConfirmePassword = this.handleChangeConfirmePassword.bind(this);
        this.handleChangeTelephone = this.handleChangeTelephone.bind(this);
        this.handleChangeSexe = this.handleChangeSexe.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeName(event) {
        this.setState({name: event.target.value});
      }
    
      handleChangeEmail(event) {
        this.setState({email: event.target.value});
      }
    
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
    
      handleChangeTelephone(event) {
        this.setState({telephone: event.target.value});
      }
    
      handleChangeSexe(event) {
        this.setState({sexe: event.target.options[event.target.selectedIndex].text});
      }

      //handleChangeConfirmePassword(event) {
      //  this.setState({newpassword: event.target.value});
      //}
    
      handleChangeRole(event) {
        this.setState({role: event.target.options[event.target.selectedIndex].text});
      }

      handleSubmit(event) {
        console.log('Name : ' + this.state.name);
        console.log('Mail : ' + this.state.email);
        console.log('Password : ' + this.state.password);
        console.log('Sexe : ' + this.state.sexe);
        console.log('Telephone : ' + this.state.telephone);
        console.log('Role : ' + this.state.role);
        event.preventDefault();
      }


    render() {

// handle button click of signin form
const handleCreate = () => {
    axios.post('http://127.0.0.1:8000/api/auth/user', {
        name    : this.state.name,
        email    : this.state.email,
        password    : this.state.password,
        sexe    : this.state.sexe,
        telephone    : this.state.telephone,
        role    : this.state.role
    }).then(function (response) {
      // setter
      // localStorage.setItem('token', response.data.access_token)
      // localStorage.setItem('name', response.data.user.name)
      // localStorage.setItem('email', response.data.user.email)
      // localStorage.setItem('role', response.data.user.role)
      // route for profile
      console.log(response)
    }).catch(function (error) {
        console.log(error);
    });
}

return (
<div className="container mt-5">
<Nav name="add new user" />
    <div className="row">
    <div className="col-md-12">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Add a new user</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label for="name">Name</label>
                            <input id="name" type="text" value={this.state.name} onChange={this.handleChangeName} className="form-control" name="name" required/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="email">E-Mail Address</label>
                            <input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" name="email" required/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="password">Password</label>
                            <input id="password" type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" name="password" required/>
                        </div>

                        <div className="form-group col-md-6">
                            <label for="telephone">Telephone</label>
                            <input id="telephone" type="text" onChange={this.handleChangeTelephone} className="form-control" name="telephone" value={this.state.telephone} />
                        </div>

                        <div className="form-group col-md-6">
                            <label for="name">Sexe</label>
                            <select name="sexe" class="form-control" value={this.state.sexe} onChange={this.handleChangeSexe}>
                              <option value="male">male</option>
                              <option value="female">female</option>
                            </select>
                        </div>

<div className="form-group col-md-6">
    <label for="role-confirm">Role</label>
    <select name="role" class="form-control" value={this.state.role} onChange={this.handleChangeRole}>
  <option value="adminstrator">Adminstrator</option>
  <option value="gestionnaire">Gestionnaire</option>
  <option value="equipeintervention">équipes d'intervention</option>
  <option value="etudiant">etudiant</option>
  <option value="prof">prof</option>
</select>
</div>

                        <div className="form-group col-md-6 mb-0">
                            <button type="submit" className="btn btn-outline-info" onClick={handleCreate}>
                              Create a new account
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