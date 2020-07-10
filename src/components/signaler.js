import React, { Component} from "react";
import axios from 'axios';
import Nav from './nav';

export default class Signaler extends Component {
    
    constructor(props) {
        super(props);
        this.state = {desc: '',localisation: '',lieu: '',nature: '',cause: ''};
    
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.handleChangeLocalisation = this.handleChangeLocalisation.bind(this);
        this.handleChangeLieu = this.handleChangeLieu.bind(this);
        this.handleChangeNature = this.handleChangeNature.bind(this);
        this.handleChangeCause = this.handleChangeCause.bind(this);
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

      handleSubmit(event) {
        event.preventDefault();
      }

    render() {

// handle button click of signin form
const handleSignin = () => {
    axios.post('http://127.0.0.1:8000/api/auth/signalisation', {
        desc    : this.state.desc,
        localisation    : this.state.localisation,
        lieu    : this.state.lieu,
        photo    : 'this.state.photo',
        nature    : this.state.nature,
        cause    : this.state.cause,
    }).then(function (response) {
      // setter
      //localStorage.setItem('token', response.data.access_token)
      //localStorage.setItem('id', response.data.user.id)
      //localStorage.setItem('name', response.data.user.name)
      //localStorage.setItem('email', response.data.user.email)
      //localStorage.setItem('role', response.data.user.role)

    axios.post('http://127.0.0.1:8000/api/auth/signaler', {
        user_id    : localStorage.getItem('id'),
        signalisation_id    : response.data.id,
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

      // route for profile
      console.log(response)
    }).catch(function (error) {
        console.log(error);
    });
}

return (
<div className="container mt-5">
    <Nav name="Signaler" />

    <div className="row">
    <div className="col-md-12">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Signaler</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label for="desc">Description</label>
                            <input id="desc" type="text" value={this.state.desc} onChange={this.handleChangeDesc} className="form-control" name="desc" required/>
                        </div>

<div className="form-group col-md-6">
    <label for="localisation">Localisation</label>
    <input id="localisation" type="text" value={this.state.localisation} onChange={this.handleChangeLocalisation} className="form-control" name="localisation" required/>
</div>

<div className="form-group col-md-6">
    <label for="lieu">Lieu</label>
    <input id="lieu" type="text" value={this.state.lieu} onChange={this.handleChangeLieu} className="form-control" name="lieu" required/>
</div>

<div className="form-group col-md-6">
    <label for="nature">Nature</label>
    <input id="nature" type="text" value={this.state.nature} onChange={this.handleChangeNature} className="form-control" name="nature" required/>
</div>

<div className="form-group col-md-6">
    <label for="cause">Cause</label>
    <input id="cause" type="text" value={this.state.cause} onChange={this.handleChangeCause} className="form-control" name="cause" required/>
</div>

<div className="form-group col-md-6">
<label for="upload">Upload picturs</label>
<div className="custom-file">
  <input type="file" className="custom-file-input" id="customFile" />
  <label className="custom-file-label" for="customFile">Choose file</label>
</div>
</div>

                        <div className="form-group col-md-12 mb-0">
                            <button type="submit" className="btn btn-outline-info" onClick={handleSignin}>
                                Create Signalisation
                            </button>
                        </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="col-md-7">

        </div>
    </div>
</div>
        );
    }
}