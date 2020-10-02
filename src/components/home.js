import React, { Component } from "react";
import axios from 'axios';
import Post from "./post";

async function all_signalisations() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisation')
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}
async function allSignalisationHasEnding() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationHasEnding')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {all: [],allEnding:[],searchData: [],value: '',cate: 'desc'};
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
        allSignalisationHasEnding().then(response => {
            this.setState({
                allEnding: response.data.data
            });
        });
        
      }

// handle button click of signin form
handleSearch()
{
  if(this.state.cate == 'desc') {
      axios.get('http://127.0.0.1:8000/api/auth/search/?desc=' + this.state.value).then(function (response) {
      console.log(response)
      this.setState({
         searchData: response.data
      });
      }).catch(function (error) {
      console.log(error);
      });
  } else if(this.state.cate == 'nature') {
      axios.get('http://127.0.0.1:8000/api/auth/search/?nature=' + this.state.value).then(function (response) {
      console.log(response)
      this.setState({
         searchData: response.data
      });
      }).catch(function (error) {
      console.log(error);
      });
  } else if(this.state.cate == 'cause') {
      axios.get('http://127.0.0.1:8000/api/auth/search/?cause=' + this.state.value).then(function (response) {
      console.log(response)
      this.setState({
          searchData: response.data
      });
      }).catch(function (error) {
      console.log(error);
  });
  }
}
render() {


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
    <div className="container-fluid">
        <div className="col-md-12">    
            <div className="jumbotron jumbotron-fluid">
                <div className="container">

                  <div className="row">
                    <div className="col-md-6">
                      
                    <div className="ml-3">
                    <h2 className="font-weight-bold text-info">Signalisation des problems.</h2>
                    <h2 className="lead font-weight-bold text-info">Informer.</h2>
                    </div>

                    <div className="mt-5">
                    <form method="POST" onSubmit={this.handleSubmit}>
          
          <div className="form-group col-md-12">
              <input className="form-control form-control-lg w-100 text-sm text-muted" name="search" type="text" onChange={this.handleChangeValue} value={this.state.value} placeholder="Rechercher par description,nature,cause" aria-label="Rechercher" />          
          </div>    
          
          <div className="form-group col-md-12">
        <select name="cate" class="form-control text-muted" value={this.state.cate} onChange={this.handleChangeCate}>
  <option value="desc">Description</option>
  <option value="nature">Nature</option>
  <option value="cause">Cause</option>
</select>
          </div>

          <div className="form-group col-md-6 ml-0">
              <button className="btn btn-outline-info my-lg-0" data-toggle="modal" data-target="#exampleModalCenter" type="submit" onClick={() => {this.handleSearch()}}>Chercher</button>
          </div>
          </form>

<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalCenterTitle">Résultats de recherche</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-outline-info" data-dismiss="modal">Fermer</button>
      </div>
    </div>
  </div>
</div>



          </div>


                    </div>
                    <div className="col-md-6">
                    <img src="background.png" className="w-100 h-100 mt-2 rounded" alt=""/>
                    </div>
                    </div>


                    <div className="container-fluid">
                    <div className="col-md-12 mt-5 bg-info rounded">   
            <div className="jumbotron jumbotron-fluid m-0 p-5">
                    <h2 className="display-5 text-center text-white font-weight-bold">Nous vous proposons le moyen le plus simple de suivre et d'envoyer des signaux !</h2>
            </div>
        </div>
        </div>


                </div>
            </div>
        </div>
        
        
        <div className="col-md-12 mt-0">   
        <div className="card border-0 shadow">
                <div className="card-header border-0 bg-light text-muted"><h4>Les dernières Signalisations</h4></div>

                <div className="card-body">
        <Post link="/view/single/"  author={true} elements={this.state.all}></Post>
        </div>
        </div>
        </div>

        <div className="col-md-12 mt-5">  
        <div className="card border-0 shadow">
                <div className="card-header border-0 bg-light text-muted"><h4>Les travaux qui terminé</h4></div>

                <div className="card-body">
        <Post link="/view/single/"  author={true} elements={this.state.allEnding}></Post>
        </div>
        </div>
        </div>

    </div>
);
}
}