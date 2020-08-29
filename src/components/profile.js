import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';

// handle button click of login form
async function user(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user/' + id);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class User extends Component {

constructor(props) {
    super(props);
    this.state = {name: '',email: '',password: '',sexe: '',telephone: '',role: 'etudiant',dataUser: [],loading: false,vd: false};
    
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
    this.setState({vd: true});
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
    this.setState({vd: true});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleChangeTelephone(event) {
    this.setState({telephone: event.target.value});
    this.setState({vd: true});
  }

  handleChangeSexe(event) {
    this.setState({sexe: event.target.value});
    this.setState({vd: true});
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
    console.log('Role : ' + this.state.role);
    console.log('Sexe : ' + this.state.sex);
    console.log('Telephone : ' + this.state.telephone);
    this.setState({loading: true});
    event.preventDefault();
  }

      componentDidMount =()=>{
        user(localStorage.getItem('id')).then(response => {
            this.setState({
              dataUser: response.data
            });
            this.setState({
              name: this.state.dataUser['name']
            });
            this.setState({
              email: this.state.dataUser['email']
            });
            this.setState({
              role: this.state.dataUser['role']
            });
            this.setState({
              sexe: this.state.dataUser['sexe']
            });
            this.setState({
              telephone: this.state.dataUser['telephone']
            });
        });
      }

render() {

// handle button click of signin form
const handleUpdate = () => {

if(this.state.password === '') {
    axios.put('http://127.0.0.1:8000/api/auth/user/' + localStorage.getItem('id'), {
        name    : this.state.name,
        email    : this.state.email,
        role    : this.state.role,
        sexe    : this.state.sexe,
        telephone    : this.state.telephone,
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
} else {
    axios.put('http://127.0.0.1:8000/api/auth/user/' + localStorage.getItem('id'), {
        name    : this.state.name,
        email    : this.state.email,
        password    : this.state.password,
        role    : this.state.role,
        sexe    : this.state.sexe,
        telephone    : this.state.telephone,
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

}

const delete_user = () => {
  axios.delete('http://127.0.0.1:8000/api/auth/user/' + this.props.match.params.id)
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

return (<div className="container mt-5">
    <Nav name="Profile" />
    <div className="row">

    <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Update Profile </div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">Name</label>
                            <div className="col-md-8">
                                <input id="name" type="text" onChange={this.handleChangeName} className={ this.state.name == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="name" value={this.state.name} required/>
                                { this.state.name == '' && this.state.vd
                                  ? <div className="invalid-feedback"> This field is empty.</div>
                                  : null
                                }
                            </div>
                        </div>

<div className="form-group row">
    <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
    <div className="col-md-8">
        <input id="email" type="email" onChange={this.handleChangeEmail} className={ this.state.email == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" }  name="email" value={this.state.email} required/>
        { this.state.email == '' && this.state.vd
          ? <div className="invalid-feedback"> This field is empty.</div>
          : null
        }
    </div>
</div>

<div className="form-group row">
                            <label for="password" className="col-md-4 col-form-label text-md-right">Password</label>
                            <div className="col-md-8">
                                <input id="password" type="password" value={this.state.password} onChange={this.handleChangePassword} className="form-control" name="password" />
                            </div>
                        </div>

<div className="form-group row">
    <label for="telephone" className="col-md-4 col-form-label text-md-right">Telephone</label>
    <div className="col-md-8">
        <input id="telephone" type="text" onChange={this.handleChangeTelephone} className={ this.state.telephone == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" }  name="telephone" value={this.state.telephone}/>
        { this.state.telephone == '' && this.state.vd
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
        <label for="name" className="col-md-4 col-form-label text-md-right">Role</label>
        <div className="col-md-8">
  <fieldset disabled>
      <select id="disabledSelect" class="form-control">
        <option>{this.state.role}</option>
      </select>
  </fieldset>
        </div>
</div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                              { this.state.loading
                                ? <button type="submit" className="btn btn-outline-info" disabled>updated... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                : <button type="submit" className="btn btn-outline-info" onClick={handleUpdate} >Update</button>
                              }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0 bg-info text-white">Info</div>

                <div className="card-body">
                <img src="/undraw_browsing_urt9.svg" className="w-100 h-75 p-2 mb-3" alt=""/>
                    <form method="POST" onSubmit={this.handleSubmit}>
                        <div className="form-group row mb-0">
                            <div className="col-md-6">
                            <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModalCenter">Delete account</button>
                            </div>

<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Delete you'r account</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      Are you sure ? you'r account will deleted and you can't login anymore to you'r account ! 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-danger" onClick={delete_user}>Delete</button>
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
        </div>

    
    </div>
</div>
);
}

}