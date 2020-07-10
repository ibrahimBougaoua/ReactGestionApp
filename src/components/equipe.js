import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';
import { Link } from "react-router-dom";

// handle button click of login form
async function equipe(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipe/' + id);
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

// handle button click of login form
async function membres() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/membre');
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_equipes() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipe')
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function all_users() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/user')
    //console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function user(id) {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/user/' + id)
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function all_equipe_members() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/user')
    //console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default class Single extends Component {

constructor(props) {

    super(props);
    this.state = {d_f_equipe: '',mail: '',telephone: '',dataEquipe: [],all: [],membresIds: [],membres: [],member_id: 0,allUsers: [],allMembers: [],getUserMembreByIds: [],dataUser: [],chef: ''};

    this.handleChanged_f_equipe = this.handleChanged_f_equipe.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeTelephone = this.handleChangeTelephone.bind(this);
    this.handleChangeMemeber = this.handleChangeMemeber.bind(this);
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

  handleChangeMemeber(event) {
    this.setState({member_id: event.target.options[event.target.selectedIndex].value});
    console.log(this.state.member_id);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

      componentDidMount =()=>{
        equipe(this.props.match.params.id).then(response => {
          this.setState({
            dataEquipe: response.data
          });
        user(this.state.dataEquipe['chef_equipe']).then(response => {
          this.setState({
              chef: response.data
          });
        });
        });
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
        all_equipe_members().then(response => {
          this.setState({
              allMembers: response.data
          });
        });
        
        membres().then(response => {
          let user_data = [];
          response.data.map((element) =>
          user(element['user_id']).then(response => {
            user_data = this.state.dataUser;
            user_data.push(response.data);
            // console.log(response.data.name);
            this.setState({
              dataUser: user_data
            })
          })
          );
        });

      }

render() {
// handle button click of signin form
const handleUpdate = () => {
  axios.post('http://127.0.0.1:8000/api/auth/equipe', {
      d_f_equipe    : this.state.d_f_equipe,
      mail    : this.state.mail,
      telephone    : this.state.telephone
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

// handle button click of signin form
const handleAddMembre = () => {
    axios.post('http://127.0.0.1:8000/api/auth/membre', {
        user_id    : this.state.member_id,
        equipe_id    : this.props.match.params.id,
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

const delete_equipe = () => {
  axios.delete('http://127.0.0.1:8000/api/auth/equipe/' + this.props.match.params.id)
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

const delete_membre = (id) => {
  axios.delete('http://127.0.0.1:8000/api/auth/membre/' + id)
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

const all_data = this.state.dataUser.map((element,key) =>
<tr>
<td key={key}>{element.name}</td>
<td key={key}>{element.email}</td>
<td key={key}>{element.role}</td>
<td key={key}>{element.created_at}</td>
<td key={key}><button type="submit" className="btn btn-sm btn-outline-danger" onClick={delete_membre(element.id)}>Delete</button></td>
<td key={key}><Link to={'/user/single/' + element.id} className="btn btn-sm btn-outline-info">View</Link></td>
</tr>
);

const all_data_users = this.state.allUsers.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

return (<div className="container mt-5">
    <Nav name="Single Equipe" />
    <div className="row">
    <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Create Equipe</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                            <label for="name" className="col-md-4 col-form-label text-md-right">d f equipe</label>
                            <div className="col-md-8">
                                <input id="name" type="text" onChange={this.handleChanged_f_equipe} className="form-control" name="name" value={this.state.dataEquipe['d_f_equipe']} required/>
                            </div>
                        </div>

<div className="form-group row">
    <label for="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
    <div className="col-md-8">
        <input id="email" type="email" onChange={this.handleChangeEmail} className="form-control" name="email" value={this.state.dataEquipe['mail']} required/>
    </div>
</div>

<div className="form-group row">
    <label for="telephone" className="col-md-4 col-form-label text-md-right">Telephone</label>
    <div className="col-md-8">
        <input id="telephone" type="text" onChange={this.handleChangeTelephone} className="form-control" name="telephone" value={this.state.dataEquipe['telephone']}/>
    </div>
</div>

<div className="form-group row">
    <label for="chef" className="col-md-4 col-form-label text-md-right">chef</label>
    <div className="col-md-8">    
  <fieldset disabled>
        <input id="chef" type="text" className="form-control" name="chef" value={this.state.chef['name']}/>
  </fieldset>
    </div>
</div>


                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-4">
                                <button type="submit" className="btn btn-outline-info" onClick={handleUpdate}>
                                    Update Equipe
                                </button>
                            </div>
                            <button type="button" className="btn btn-outline-danger" onClick={delete_equipe}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    <div className="col-md-6">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Add a membre to Equipe</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                        <div className="form-group row">
                          
                        <div className="col-md-12">
                        <select class="custom-select" size="8" name="member_id" value={this.state.member_id} onChange={this.handleChangeMemeber}>
                        {all_data_users}
                        </select>
                        </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-outline-info" onClick={handleAddMembre}>
                                    Add a membre
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>

<div className="row">    
        <div className="col-md-12 mt-4">
    
        <table className="table shadow">
  <thead>
    <tr className="border-top-0">
      <th scope="col">Name</th>
      <th scope="col">E-mail</th>
      <th scope="col">Role</th>
      <th scope="col">Created at</th>
      <th scope="col">Remove</th>
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