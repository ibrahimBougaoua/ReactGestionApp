import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';

async function all_chefs() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/showuerbyrole/interventionteam')
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

async function all_message(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/messages/' + id)
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Contact extends Component {

constructor(props) {

    super(props);
    this.state = {name: 'Select a friend !',user_id: 0,message: '',allUsers: [],allMessage: []};

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChangeUser(event) {
    this.setState({user_id: event.target.options[event.target.selectedIndex].value});
    this.setState({name: event.target.options[event.target.selectedIndex].text});
    all_message(event.target.options[event.target.selectedIndex].value).then(response => {
        console.log(response.data)
        this.setState({
          allMessage: response.data
        });
    });
  }

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(event) {
    console.log('name : ' + this.state.name);
    console.log('send_user_id : ' + localStorage.getItem('id'));
    console.log('catch_user_id : ' + this.state.user_id);
    event.preventDefault();
  }

    componentDidMount =() => {
        all_chefs().then(response => {
          this.setState({
              allUsers: response.data
          });
        });
    }

render() {

// handle button click of signin form
const handleSendMessage = () => {
    axios.post('http://127.0.0.1:8000/api/auth/message', {
        message    : this.state.message,
        send_user_id    : localStorage.getItem('id'),
        catch_user_id    : this.state.user_id
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

const all_data_message = this.state.allMessage.map((element) =>
<div className="card w-100 mb-2">
{element.send_user_id == localStorage.getItem('id')
? <div className="card-body"><p className="float-right text-info card-text">{element.message}</p><p class="card-text"><small class="float-left text-muted">{element.created_at}</small></p></div>
: <div className="card-body"><p className="float-left text-secondary card-text">{element.message}</p><p class="card-text"><small class="float-right text-muted">{element.created_at}</small></p></div>
}
</div>
);

const all_data_users = this.state.allUsers.map((element) =>
<option value={element['id']}>{element['name']}</option>
);

return (<div className="container mt-5">

    <Nav name="Contact" />

    <div className="row">
    <div className="col-md-4">
            <div className="card border-0 shadow">
                <div className="card-header border-0">list of chef d'equipe d'intervention</div>

                <div className="card-body">
                        <div className="form-group row">
                        <div className="col-md-12">
                        <select class="custom-select" size="15" name="member_id" value={this.state.user_id} onChange={this.handleChangeUser}>
                        {all_data_users}
                        </select>
                        </div>
                        </div>
                </div>

            </div>
            </div>

    <div className="col-md-8">
            <div className="card border-0 shadow">
                <div className="card-header border-0">Contact : {this.state.name}</div>

                <div className="card-body">
                    <form method="POST" onSubmit={this.handleSubmit}>

                    <div className="form-group row p-3">
                        <div className="col-md-12">
                            <div data-spy="scroll" data-target="#navbar-example2" data-offset="0">
                            <div className="row">
                                {all_data_message}
                            </div>
                            </div>
                        </div>
                    </div>

                        <div className="form-group row">
                            <div className="col-md-12">
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleChangeMessage}></textarea>
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-outline-info" onClick={handleSendMessage}>
                                    Send a message
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