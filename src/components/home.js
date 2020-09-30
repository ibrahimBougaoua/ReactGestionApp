import React, { Component } from "react";
import axios from 'axios';
import Post from "./post";
import { Link } from "react-router-dom";

async function all_signalisations() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {all: [],value: '',cate: 'desc'};
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeCate = this.handleChangeCate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChangeValue(event) {
        this.setState({value: event.target.value});
      }

      handleChangeCate(event) {
        this.setState({cate: event.target.options[event.target.selectedIndex].value});
      }
      
  handleSubmit(event) {
    console.log('value : ' + this.state.value)
    console.log('cate : ' + this.state.cate)
    event.preventDefault();
  }

      componentDidMount = () => {
        all_signalisations().then(response => {
            this.setState({
                all: response.data.data
            });
        });
      }

render() {

// handle button click of signin form
const handleSearch = () => {
    if(this.state.cate == 'desc') {
        axios.get('http://127.0.0.1:8000/api/auth/search/?desc=' + this.state.value).then(function (response) {
        console.log(response)
        }).catch(function (error) {
        console.log(error);
        });
    } else if(this.state.cate == 'nature') {
        axios.get('http://127.0.0.1:8000/api/auth/search/?nature=' + this.state.value).then(function (response) {
        console.log(response)
        }).catch(function (error) {
        console.log(error);
        });
    } else if(this.state.cate == 'cause') {
        axios.get('http://127.0.0.1:8000/api/auth/search/?cause=' + this.state.value).then(function (response) {
        console.log(response)
        }).catch(function (error) {
        console.log(error);
    });
    }
}

/*
const all_data = (elements) => elements.map((elements) =>
elements.map((element) => 
<div className="card">
  <img src={'http://127.0.0.1:8000/storage/images/' + element['name']} className="card-img-top" alt="..." />
  <div className="card-body">
    <h6 className="card-title">{element['nature']}</h6>
    <Link to={'view/single/' + element['id']} className="btn btn-sm btn-outline-info">View</Link>
  </div>
</div>
));
*/

return (
    <div className="row justify-content-center">
        <div className="col-md-12">    
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                    <h2 className="font-weight-bold text-info">Signalisation des problems.</h2>
                    <h2 className="lead font-weight-bold text-info">Informer.</h2>

                    <div className="mt-5">
                    <form method="POST" onSubmit={this.handleSubmit}>
          
          <div className="form-group col-md-12">
              <input className="form-control form-control-lg" name="search" type="text" onChange={this.handleChangeValue} value={this.state.value} placeholder="Rechercher des problemes par sa nature" aria-label="Rechercher" />          
          </div>    
          
          <div className="form-group col-md-12">
        <select name="cate" class="form-control" value={this.state.cate} onChange={this.handleChangeCate}>
  <option value="desc">Description</option>
  <option value="nature">Nature</option>
  <option value="cause">Cause</option>
</select>
          </div>

          <div className="form-group col-md-6 ml-0">
              <button className="btn btn-lg btn-outline-info my-lg-0" data-toggle="modal" data-target="#exampleModal" type="submit" onClick={handleSearch}>Chercher</button>
          </div>
    
          </form>
          </div>


                    </div>
                    <div className="col-md-6">
                    <img src="background.png" className="w-100 h-100 mt-2 rounded" alt=""/>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-md-12 bg-info rounded">   
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-5 text-center text-white font-weight-bold">Trouvez des Problemes et Support les Signalisation !</h1>
{ true  ? null : <p className="lead text-center text-white">follow thousands of problemes for free with limited ads.</p> }
                </div>
            </div>
        </div>

        <div className="container-fluid">
        <Post name="Les dernières Signalisations" link="/view/single/" elements={this.state.all}></Post>
        </div>

    </div>
);
}
}