import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';
import { Link } from "react-router-dom";

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
export default class View extends Component {

constructor(props) {
    super(props);
    this.state = {dataEquipe: [],all: [],hasSn: false};
  }
      componentDidMount =()=>{
        signalisation(this.props.match.params.id).then(response => {
          console.log(response.data)
          this.setState({
            dataEquipe: response.data
          });
          
        });
        all_signalisations().then(response => {
            this.setState({
                all: response.data
            });
        });
        hasSignaler(localStorage.getItem('id')).then(response => {
            console.log(response.data);
            if(this.props.match.params.id == response.data.signalisation_id)
            {
                this.setState({
                    hasSn: true
                });
            }
        });
      }

render() {

console.log(this.state.hasSn);

// handle button click of signin form
const handleSignaler = () => {
    axios.post('http://127.0.0.1:8000/api/auth/signaler', {
        user_id    : localStorage.getItem('id'),
        signalisation_id    : this.props.match.params.id,
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
    <div className="card">
      <img src="https://images.pexels.com/photos/3815585/pexels-photo-3815585.jpeg?cs=srgb&dl=person-writing-on-white-paper-3815585.jpg&fm=jpg" className="card-img-top" alt="..." />
      <div className="card-body">
        <h6 className="card-title">{element['desc']}</h6>
        <Link to={'/view/single/' + element['id']} className="btn btn-sm btn-outline-info">View</Link>
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
      <img src="..." className="card-img" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
      {
        this.state.hasSn
        ? <button type="submit" className="btn btn-secondary float-right" onClick={handleSignaler}>Allready Signaled</button>
        : <button type="submit" className="btn btn-outline-info float-right" onClick={handleSignaler}>Signaler</button>
        }
        
        <h5 className="card-title">{this.state.dataEquipe['desc']}</h5>
        <h5 className="card-title">{this.state.dataEquipe['localisation']}</h5>
        <h5 className="card-title">{this.state.dataEquipe['lieu']}</h5>
        <h5 className="card-title">{this.state.dataEquipe['nature']}</h5>
        <p className="card-text">{this.state.dataEquipe['cause']}</p>
        <p className="card-text"><small className="text-muted">{this.state.dataEquipe['created_at']}</small></p>
      </div>
    </div>
  </div>
</div>
        </div>

        <div className="col-md-12">    
            <div className="jumbotron jumbotron-fluid">
                    <div class="card-deck">
                        {all_data}
                    </div>
            </div>
        </div>

        </div>

</div>
);
}

}