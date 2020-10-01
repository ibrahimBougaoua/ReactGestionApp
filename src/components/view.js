import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';
import Moment from 'moment';
import { Link } from "react-router-dom";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

// handle button click of login form
async function hasSignaler(user_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signaler/' + user_id);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

// handle button click of login form
async function allComments(id) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/getallsignalisationcomments/' + id);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

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

async function all_signalisations() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

function handleCreate(user_id,reply_id,signalisation_id,name,email,message)
{
  axios.post('http://127.0.0.1:8000/api/auth/comment', {
      user_id : user_id,
      reply_id : reply_id,
      signalisation_id : signalisation_id,
      name : name,
      mail : email,
      comment : message
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

function handleSignaler(user_id,signalisation_id)
{
  axios.post('http://127.0.0.1:8000/api/auth/signaler', {
      user_id    : user_id,
      signalisation_id    : signalisation_id,
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

export default class View extends Component {

constructor(props) {
    super(props);
    this.state = {dataEquipe: [],allComment: [],all: [],name: '',email: '',message: '',reply_id: 0,user_id: 0,hasSn: false,vd: false};

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
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

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
    this.setState({vd: true});
  }

  handleSubmit(event) {
    console.log('name : ' + this.state.name)
    console.log('email : ' + this.state.email)
    console.log('message : ' + this.state.message)
    event.preventDefault();
  }

      componentDidMount =()=>{
        signalisation(this.props.match.params.id).then(response => {
          console.log(response.data)
          this.setState({
            dataEquipe: response.data.data
          });
          
        });
        all_signalisations().then(response => {
            this.setState({
                all: response.data.data
            });
        });
        allComments(this.props.match.params.id).then(response => {
            this.setState({
                allComment: response.data
            });
        });
        hasSignaler(localStorage.getItem('id')).then(response => {
            console.log(response.data);
            if(response.data != null)
            {
                this.setState({
                    hasSn: true
                });
            }
        });
      }

render() {

const all_comments = this.state.allComment.map((element) =>
<div className="card border-0 shadow mb-3">
<div className="card-body">
<p className="card-text text-sm text-muted">Commentaire : {element.comment}</p>
<p className="card-text text-sm text-muted">Auteur(e) : {element.name}</p>
<p className="card-text text-sm text-muted">Créé le : {Moment(element.created_at).format('DD-MM-YYYY')}</p>  
</div>
</div>
);

return (<div className="container-fluid mt-5">
    <Nav name="View more" />
    <div className="row">
        
    <div className="col-md-12">
        
<div className="card mb-3 border-0 shadow">
  <div className="row no-gutters">
    <div className="col-md-4">
    <img key={this.state.dataEquipe['name']} src={'http://127.0.0.1:8000/storage/images/' + this.state.dataEquipe['name']} className="card-img rounded-0" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <p className="card-text text-muted">Description : {this.state.dataEquipe['desc']}</p>
        
<div style={{width:'100%',height:'50%'}}>
<p className="card-text text-muted">Localisation :</p>
<MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAv9RaNVTKPm_A3VLYUJHa9i-pnzi7TZAg
  "
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `200px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
</div>
        
        <p className="card-text mt-3 text-muted">Lieu : {this.state.dataEquipe['lieu']}</p>
        <p className="card-text text-muted">Nature : {this.state.dataEquipe['nature']}</p>
        <p className="card-text text-muted">Cause : {this.state.dataEquipe['cause']}</p>
        <p className="card-text text-muted">Auteur(e) : {this.state.dataEquipe['user_name']}</p>
        <p className="card-text text-muted"><small className="text-muted">Créé le : {Moment(this.state.dataEquipe['created_at']).format('DD-MM-YYYY')}</small></p>
        {this.state.hasSn ? <button type="submit" className="btn btn-info float-right" style={{position:"relative",bottom:"20px"}} onClick={() => {handleSignaler(localStorage.getItem('id'),this.props.match.params.id)}}>Signaler</button> : null}
      </div>
    </div>
  </div>
</div>
        </div>

<div className="col-md-12 mt-3">    
{all_comments}
<div className="card border-0 shadow">
                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label for="name">Nom</label>
                            <input id="name" type="text" value={this.state.name} onChange={this.handleChangeName} className={ this.state.name == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="name" placeholder="name" required/>
                            { this.state.name == '' && this.state.vd
                              ? <div className="invalid-feedback"> This field is empty.</div>
                              : null
                            }
                        </div>

                        <div className="form-group col-md-6">
                            <label for="email">E-mail</label>
                            <input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} className={ this.state.email == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="email" placeholder="exmple@mail.dz" required/>
                            { this.state.email == '' && this.state.vd
                              ? <div className="invalid-feedback"> This field is empty.</div>
                              : null
                            }
                        </div>

                        <div className="form-group col-md-12">
                            <label for="telephone">Commentaire</label>
                            <textarea id="exampleFormControlTextarea1" rows="3" name="message" onChange={this.handleChangeMessage} className={ this.state.message == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } >{this.state.message}</textarea>
                        </div>

                        <div className="form-group col-md-12 mb-0">
                            <button type="submit" className="btn btn-outline-info" onClick={() => {handleCreate(localStorage.getItem('id'),0,this.props.match.params.id,this.state.name,this.state.email,this.state.message)}} >Créé</button>
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