import React, { Component } from "react";
import axios from 'axios';
import Nav from './nav';

// handle button click of login form
async function membres() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipemembre/' + localStorage.getItem('id'));
      //console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Membre extends Component {

constructor(props) {
    super(props);
    this.state = {allMembers: []};
  }

      componentDidMount =()=>{
        membres().then(response => {
          this.setState({
            allMembers: response.data
          });
        });
      }

render() {

const all_data = this.state.allMembers.map((element,key) =>
<tr>
<td key={key}>{element.name}</td>
<td key={key}>{element.email}</td>
<td key={key}>{element.telephone}</td>
<td key={key}>{element.sexe}</td>
<td key={key}>{element.created_at}</td>
</tr>
);

return (<div className="container mt-5">
    <Nav name="Membres" />
<div className="row">    
        <div className="col-md-12">
    
        <table className="table shadow">
  <thead>
    <tr className="border-top-0">
      <th scope="col">Name</th>
      <th scope="col">E-mail</th>
      <th scope="col">Telephone</th>
      <th scope="col">Sexe</th>
      <th scope="col">Created at</th>
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