import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

export default class Signup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {name: '',email: '',password: '',telephone: '',sexe: 'male',role: 'student',loading: false,vdName: false,vdEmail: false,vdPassword: false,vdTelephone: false};
    
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeTelephone = this.handleChangeTelephone.bind(this);
        this.handleChangeSexe = this.handleChangeSexe.bind(this);
        //this.handleChangeConfirmePassword = this.handleChangeConfirmePassword.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeName(event) {
        this.setState({name: event.target.value});
        this.setState({vdName: true});
      }
    
      handleChangeEmail(event) {
        this.setState({email: event.target.value});
        this.setState({vdEmail: true});
      }
    
      handleChangePassword(event) {
        this.setState({password: event.target.value});
        this.setState({vdPassword: true});
      }

      handleChangeTelephone(event) {
        this.setState({telephone: event.target.value});
        this.setState({vdTelephone: true});
      }
    
      handleChangeSexe(event) {
        this.setState({sexe:  event.target.options[event.target.selectedIndex].value});
      }
    
      //handleChangeConfirmePassword(event) {
      //  this.setState({newpassword: event.target.value});
      //}
    
      handleChangeRole(event) {
        this.setState({role: event.target.options[event.target.selectedIndex].value});
      }

      handleSubmit(event) {
        console.log('name : ' + this.state.name);
        console.log('email : ' + this.state.email);
        console.log('password : ' + this.state.password);
        console.log('telephone : ' + this.state.telephone);
        console.log('sexe : ' + this.state.sexe);
        console.log('role : ' + this.state.role);
        //this.setState({loading: true});
        event.preventDefault();
      }

    render() {

const { history } = this.props;

// handle button click of signin form
const handleSignin = () => {
    axios.post('http://127.0.0.1:8000/api/auth/register', {
        name    : this.state.name,
        email    : this.state.email,
        password    : this.state.password,
        sexe    : this.state.sexe,
        telephone    : this.state.telephone,
        role    : this.state.role,
    }).then(function (response) {
      // setter
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('id', response.data.user.id)
      localStorage.setItem('name', response.data.user.name)
      localStorage.setItem('email', response.data.user.email)
      localStorage.setItem('role', response.data.user.role)
      // route for profile
      history.push('/profile');

      console.log(response)
    }).catch(function (error) {
        console.log(error);
    });
}

// { this.state.loading ? <Redirect to='/dashboard' /> : null }

return (
<div className="container">

    <div className="row mt-5">
    <div className="col-md-6 mt-4">
            <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">S'inscrire</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">Nom</label>
                            <div className="col-md-8">
                                <input id="name" type="text" value={this.state.name} onChange={this.handleChangeName} className={ this.state.name == '' && this.state.vdName ? 'form-control is-invalid' : "form-control is-valid" } name="name" required/>
                                { this.state.name == '' && this.state.vdName
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                } 
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                            <div className="col-md-8">
                                <input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} className={ this.state.email == '' && this.state.vdEmail ? 'form-control is-invalid' : "form-control is-valid" } name="email" required/>
                                { this.state.email == '' && this.state.vdEmail
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                } 
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="password" className="col-md-4 col-form-label text-md-right">Mot de passe</label>
                            <div className="col-md-8">
                                <input id="password" type="password" value={this.state.password} onChange={this.handleChangePassword} className={ this.state.password == '' && this.state.vdPassword ? 'form-control is-invalid' : "form-control is-valid" } name="password" required/>
                                { this.state.password == '' && this.state.vdPassword
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                } 
                            </div>
                        </div>

                        <div className="form-group row">
    <label for="telephone" className="col-md-4 col-form-label text-md-right">Téléphone</label>
    <div className="col-md-8">
        <input id="telephone" type="text" onChange={this.handleChangeTelephone} className={ this.state.telephone == '' && this.state.vdTelephone ? 'form-control is-invalid' : "form-control is-valid" } name="telephone" value={this.state.telephone}/>
        { this.state.telephone == '' && this.state.vdTelephone
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        } 
    </div>
</div>

<div className="form-group row">
        <label for="name" className="col-md-4 col-form-label text-md-right">Sexe</label>
        <div className="col-md-8">
        {
        this.state.sex === 'male'
        ? <select class="custom-select custom-select-sm" name="sexe" value={this.state.sexe} onChange={this.handleChangeSexe}><option value="male">male</option><option value="female">female</option></select>
        : <select class="custom-select custom-select-sm" name="sexe" value={this.state.sexe} onChange={this.handleChangeSexe}><option value="female">female</option><option value="male">male</option></select>
        }
        </div>
</div>

<div className="form-group row">
    <label for="role-confirm" className="col-md-4 col-form-label text-md-right">Rôle</label>
    <div className="col-md-8">
<select name="role" class="form-control" value={this.state.role} onChange={this.handleChangeRole}>
  <option value="student">etudiant</option>
  <option value="teacher">prof</option>
</select>
</div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">                                
                            { this.state.loading
                                ? <button type="submit" className="btn btn-outline-info" disabled>S'inscrire... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                : <button type="submit" className="btn btn-outline-info" onClick={handleSignin} >S'inscrire</button>
                            }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div className="col-md-6 mt-3">
            <img src="/undraw_sign_in_e6hj.svg" className="w-100 mt-2 rounded" alt=""/>
        </div>

    </div>
</div>
        );
    }
}