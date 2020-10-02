import React, { Component } from "react";
import axios from 'axios';
import Post from "./post";
import Nav from './nav';

async function all_signalisations(id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationsByAuthor/' + id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Author extends Component {

    constructor(props) {
        super(props);
        this.state = {all: [],user: []};
    }

    componentDidMount = () => {
        all_signalisations(this.props.match.params.id).then(response => {
            this.setState({
                all: response.data.data
            });
            this.setState({
                user: response.data.user_data
            });
        });
    }

render() {

return (
    <div className="container mt-5">
    <Nav name="Author" />
    <div className="container">
        <div className="row">
            <Post name={'Les dernières Signalisations par : ' + this.state.user.name} link="/view/single/" author={false} elements={this.state.all}></Post>
        </div>
    </div>
    </div>
);
}
}