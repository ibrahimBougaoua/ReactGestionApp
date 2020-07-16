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

async function getCommentByID(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/comment/' + id)
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function evaluer(intervention_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/ifevaluer/' + intervention_id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Comment extends Component {

constructor(props) {
    super(props);    
    this.state = {name: '',email: '',message: '',comment: [],loading: false,vd: false};
    
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
    this.setState({loading: true});
    event.preventDefault();
  }

      componentDidMount = () => {
        getCommentByID(this.props.match.params.id).then(response => {
            this.setState({
                comment: response.data
            });
            this.setState({
              name: this.state.comment['name']
            });
            this.setState({
              email: this.state.comment['mail']
            });
            this.setState({
              message: this.state.comment['comment']
            });
        });
      }

render() {

// handle button click of signin form
const handleUpdate = () => {
    axios.put('http://127.0.0.1:8000/api/auth/comment/' + this.props.match.params.id, {
        name    : this.state.name,
        mail    : this.state.email,
        comment    : this.state.message
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

const delete_comment = () => {
  axios.delete('http://127.0.0.1:8000/api/auth/comment/' + this.props.match.params.id)
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
    <Nav name="update comment" />
    <div className="row">

    <div className="col-md-12">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Update Comment</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>
                    <div class="form-row">
                        <div className="form-group col-md-6">
                            <label for="name">Name</label>
                            <input id="name" type="text" value={this.state.name} onChange={this.handleChangeName} className={ this.state.name == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="name" placeholder="name" required/>
                            { this.state.name == '' && this.state.vd
                              ? <div className="invalid-feedback"> This field is empty.</div>
                              : null
                            }
                        </div>

                        <div className="form-group col-md-6">
                            <label for="email">E-Mail Address</label>
                            <input id="email" type="email" value={this.state.email} onChange={this.handleChangeEmail} className={ this.state.email == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } name="email" placeholder="exmple@mail.dz" required/>
                            { this.state.email == '' && this.state.vd
                              ? <div className="invalid-feedback"> This field is empty.</div>
                              : null
                            }
                        </div>

                        <div className="form-group col-md-12">
                            <label for="telephone">Message</label>
                            <textarea id="exampleFormControlTextarea1" rows="4" name="message" onChange={this.handleChangeMessage} className={ this.state.message == '' && this.state.vd ? 'form-control is-invalid' : "form-control is-valid" } value={this.state.message}></textarea>
                        </div>

                        <div className="form-group col-md-12 mb-0">

                            { this.state.loading
                                ? <button type="submit" className="btn btn-outline-info" disabled>updated... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>
                                : <button type="submit" className="btn btn-outline-info" onClick={handleUpdate} >Update</button>
                              }

                            <button type="button" className="btn btn-outline-danger float-right" data-toggle="modal" data-target="#exampleModalCenter">Delete this account</button>


                            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Delete this Comment</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      Are you sure ? you'r comment will deleted and you can't see it anymore ! 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-danger" onClick={delete_comment}>Delete</button>
        <button type="button" className="btn btn-outline-info" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>




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