import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';

async function checkLoginUser() {
    try {
      const response = await axios({
        method :'POST',
        url :'http://127.0.0.1:8000/api/auth/me',
        headers : {'Accept':'application/json'},
        params : {'token':localStorage.getItem('token')}
      })
      console.log('ccccccc : ' + response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {hasLogin: false,email: '',password: '',errorMessage: '',loading: false,vdUserName: false,vdPassword: false};
    
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeEmail(event) {
        this.setState({email: event.target.value});
        this.setState({vdUserName: true});
      }
    
      handleChangePassword(event) {
        this.setState({password: event.target.value});
        this.setState({vdPassword: true});
      }
    
      handleSubmit(event) {
        this.setState({loading: true});
        event.preventDefault();
      }

      componentDidMount = () => {
        checkLoginUser().then(response => {
          console.log(response);
          if(response){
            this.setState({
              hasLogin: true
            });
          }
        });
      }

    render() {
      const { history } = this.props;

// handle button click of login form
const handleLogin = () => {
    axios.post('http://127.0.0.1:8000/api/auth/login', {
        email    : this.state.email,
        password : this.state.password
    }).then(function (response) {
      // setter
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('id', response.data.user.id)
      localStorage.setItem('name', response.data.user.name)
      localStorage.setItem('email', response.data.user.email)
      localStorage.setItem('role', response.data.user.role)
      // route for profile
      console.log(response)
      //history.push('/dashboard');
      //return(<Redirect to='/dashboard' />);
      window.location.replace("/dashboard");
      

    }).catch(function (error) {
      console.log('gggggg' + error);
      //return (<div class="alert alert-danger" role="alert">username or password is wrong !</div>);
    });
}

return (
<div className="container">
    <div className="row mt-5">{ this.state.errorMessage }

{ this.state.hasLogin ? <Redirect to='/dashboard' /> : null }

    { this.state.errorMessage && <div class="alert alert-danger" role="alert">{ this.state.errorMessage }</div> }

    <div className="col-md-6 mt-5">
            <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Se connecter</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                            <div className="col-md-8">
                                <input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} className={ this.state.email == '' && this.state.vdUserName ? 'form-control is-invalid' : "form-control is-valid" } required/>
                                { this.state.email == '' && this.state.vdUserName
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                }                            
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="password" className="col-md-4 col-form-label text-md-right">Mot de passe</label>

                            <div className="col-md-8">
                                <input id="password" type="password" value={this.state.password} onChange={this.handleChangePassword} className={ this.state.password == '' && this.state.vdPassword ? 'form-control is-invalid' : "form-control is-valid" } required/>
                                { this.state.password == '' && this.state.vdPassword
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                }                             
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-6 offset-md-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="remember" id="remember"/>

                                    <label className="form-check-label" for="remember">
                                    Se souvenir de moi
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-8 offset-md-4">
                                { this.state.loading
                                ? <button type="submit" className="btn btn-outline-info" disabled>Se connecter... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                : <button type="submit" className="btn btn-outline-info" onClick={handleLogin} >Se connecter</button>
                                }
                                    <a className="btn btn-link" href="a">
                                    Mot de passe oublié ?
                                    </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


        <div className="col-md-6 mt-3">
            <img src="/undraw_secure_login_pdn4.svg" className="w-100 h-100 mt-2 rounded" alt=""/>
        </div>

    </div>
</div>
        );
    }
}