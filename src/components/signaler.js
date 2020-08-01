import React, { useState,Component } from "react";
import axios from 'axios';
import Nav from './nav';
import MultiImageInput from 'react-multiple-image-input';

function MultiImageupload()
{
  const crop = {
    unit: '%',
    aspect: 4 / 3,
    width: '100'
  };
 
  const [images, setImages] = useState({});
 
  return (
    <MultiImageInput
      images={images}
      setImages={setImages}
      cropConfig={{ crop, ruleOfThirds: true }}
      theme={{
        background: '#ffffff',
        outlineColor: '#ddd',
        textColor: 'rgba(255,255,255,0.6)',
        buttonColor: '#ff0e1f',
        modalColor: '#ffffff'
      }}
    />
  );
}

export default class Signaler extends Component {
    
    constructor(props) {
        super(props);
        this.state = {desc: '',localisation: '',lieu: '',nature: '',cause: '',loading: false,vd: false};
    
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.handleChangeLocalisation = this.handleChangeLocalisation.bind(this);
        this.handleChangeLieu = this.handleChangeLieu.bind(this);
        this.handleChangeNature = this.handleChangeNature.bind(this);
        this.handleChangeCause = this.handleChangeCause.bind(this);
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

      handleSubmit(event) {
        this.setState({loading: true});
        event.preventDefault();
      }

    render() {

     
// handle button click of signin form
const handleCreate = () => {
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
                            <input id="desc" type="text" value={this.state.desc} onChange={this.handleChangeDesc} className={ this.state.desc == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="desc" required/>
                            { this.state.desc == '' && this.state.vd
                              ? <div className="invalid-feedback"> This field is empty.</div>
                              : null
                            }
                        </div>

<div className="form-group col-md-6">
    <label for="localisation">Localisation</label>
    <input id="localisation" type="text" value={this.state.localisation} onChange={this.handleChangeLocalisation} className={ this.state.localisation == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="localisation" required/>
     { this.state.localisation == '' && this.state.vd
       ? <div className="invalid-feedback"> This field is empty.</div>
       : null
     }
</div>

<div className="form-group col-md-4">
    <label for="lieu">Lieu</label>
    <input id="lieu" type="text" value={this.state.lieu} onChange={this.handleChangeLieu} className={ this.state.lieu == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="lieu" required/>
    { this.state.lieu == '' && this.state.vd
      ? <div className="invalid-feedback"> This field is empty.</div>
      : null
    }
</div>

<div className="form-group col-md-4">
    <label for="nature">Nature</label>
    <input id="nature" type="text" value={this.state.nature} onChange={this.handleChangeNature} className={ this.state.nature == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="nature" required/>
    { this.state.nature == '' && this.state.vd
      ? <div className="invalid-feedback"> This field is empty.</div>
      : null
    }
</div>

<div className="form-group col-md-4">
    <label for="cause">Cause</label>
    <input id="cause" type="text" value={this.state.cause} onChange={this.handleChangeCause} className={ this.state.cause == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="cause" required/>
    { this.state.cause == '' && this.state.vd
      ? <div className="invalid-feedback"> This field is empty.</div>
      : null
    }
</div>

<div className="form-group col-md-12">
<label for="upload">Upload picturs</label>

<MultiImageupload />

</div>

                        <div className="form-group col-md-12 mb-0">
                            { this.state.loading
                                ? <button type="submit" className="btn btn-outline-info" disabled>created... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                : <button type="submit" className="btn btn-outline-info" onClick={handleCreate} >Create</button>
                            }
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