import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';

async function all_users() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/user')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class allUser extends Component {
    
    constructor(props) {
        super(props);
        this.state = {allUsers: []};
      }

      componentDidMount = () => {
        all_users().then(response => {
            this.setState({
                allUsers: response.data
            });
        });
      }

    render() {

const all_data = this.state.allUsers.map((element) =>
<tr>
<td key={element['name']}>{element['name']}</td>
<td key={element['email']}>{element['email']}</td>
<td key={element['telephone']}>{element['telephone']}</td>
<td key={element['id']}><Link to={'user/single/' + element['id']} className="btn btn-sm btn-outline-info">View</Link></td>
</tr>
);

return (
<div className="container mt-5">
<Nav name="all users" />
    <div className="row">
<div className="col-md-12">
<table className="table shadow">
  <thead>
    <tr className="border-top-0">
      <th scope="col">Name</th>
      <th scope="col">E-mail</th>
      <th scope="col">Telephone</th>
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