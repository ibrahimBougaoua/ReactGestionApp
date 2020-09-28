import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';
import Moment from 'moment';

async function all_users() {
    try {
      const response = await axios({
        method :'GET',
        url :'http://127.0.0.1:8000/api/auth/user',
        headers : {'Accept':'application/json'},
        params : {'token':localStorage.getItem('token')}
      })
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

      const roles = (role) => {
        switch(role) {
  
          case "manager":   return "Gestionnaire";
          case "adminstrator":   return "Adminstrateur";
          case "ats": return "ATS";
          case "student":  return "Étudiant";
          case "interventionteam":  return "Chef équipe";
          case "teacher":  return "Prof";
  
          default:      return "No role match"
        }
      }

const all_data = this.state.allUsers.map((element) =>
<tr>
<td key={element['name']}>{element['name']}</td>
<td key={element['email']}>{element['email']}</td>
<td key={element['telephone']}>{element['telephone']}</td>
<td key={element['role']}>{roles(element['role'])}</td>
<td key={element['created_at']}>{Moment(element['created_at']).format('DD-MM-YYYY')}</td>
<td key={element['id']}><Link to={'user/single/' + element['id']} className="btn btn-sm btn-outline-info">Voir plus</Link></td>
</tr>
);

return (
<div className="container mt-5">
<Nav name="tous les utilisateurs" />
    <div className="row">
<div className="col-md-12">
  { this.state.allUsers == '' 
   ? <div class="card shadow border-0">
     <h5 class="card-header border-0">utilisateurs</h5>
     <div class="card-body">
     <h5 class="card-title">la list est vide</h5>
     <p class="card-text">en peut ajouter des utilisator.</p>
     <Link className="btn btn-sm btn-outline-info mr-2" to={"/new"}>Ajouter utilisator</Link>
     </div>
     </div>
    :
    <table className="table shadow">
      <thead>
        <tr className="border-top-0">
          <th scope="col">Nom</th>
          <th scope="col">E-mail</th>
          <th scope="col">Téléphone</th>
          <th scope="col">Rôle</th>
          <th scope="col">Créé le</th>
          <th scope="col">Voir plus</th>
        </tr>
      </thead>
      <tbody> {all_data} </tbody>
    </table>
    }
</div>

    </div>
</div>
        );
    }
}