import React, { Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from './nav';

async function all_comments() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/getallcomments/' + localStorage.getItem('id'))
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Comments extends Component {
    
    constructor(props) {
        super(props);
        this.state = {all: []};
      }

      componentDidMount = () => {
        all_comments().then(response => {
            this.setState({
                all: response.data
            });
        });
      }

    render() {

const all_data = this.state.all.map((element) =>
<tr>
<td key={element.name}>{element.name}</td>
<td key={element.mail}>{element.mail}</td>
<td key={element.comment}>{element.comment}</td>
<td key={element.comment}>{element.reply_id != 0 ? 'Yes' : 'No'}</td>
<td key={element.comment}>{element.created_at}</td>
<td key={element.id}><Link to={'comment/' + element.id} className="btn btn-sm btn-outline-info">View</Link></td>
</tr>
);

return (
<div className="container mt-5">
    <Nav name="Comments" />

    <div className="row">
        <div className="col-md-12">


        { this.state.all == '' 
   ? <div class="card shadow border-0">
     <h5 class="card-header border-0">comment</h5>
     <div class="card-body">
     <h5 class="card-title">la list est vide</h5>
     </div>
     </div>
    :
    <table className="table shadow">
      <thead>
      <tr className="border-top-0">
      <th scope="col">Name</th>
      <th scope="col">Mail</th>
      <th scope="col">Message</th>
      <th scope="col">Reply</th>
      <th scope="col">Date</th>
      <th scope="col">View</th>
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