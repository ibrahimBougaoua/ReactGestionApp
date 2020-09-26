import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home";
import Footer from "./components/footer";
import Login from "./components/login";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Equipes from "./components/equipes";
import Equipe from "./components/equipe";
import Contact from "./components/contact";
import Membre from "./components/membre";
import Signalisations from "./components/signalisations";
import Signale from "./components/signale";
import View from "./components/view";
import Interventions from "./components/interventions";
import Intervention from "./components/intervention";
import InterChef from "./components/interchef";
import InterSingle from "./components/intersingle";
import NewUser from "./components/users";
import AllUsers from "./components/allUsers";
import User from "./components/user";
import Signaler from "./components/signaler";
import History from "./components/history";
import All from "./components/all";
import Comments from "./components/comments";
import Comment from "./components/comment";
import Dashboard from "./components/dashboard";

async function isLogin() {
try {
  const response = axios({
    method :'POST',
    url :'http://127.0.0.1:8000/api/auth/me',
    headers : {'Accept':'application/json'},
    params : {'token':localStorage.getItem('token')}
  })
  console.error(response); 
  return response;
} catch (error) {
  console.error(error);
}
}


function getRole() {
  if(localStorage.getItem('role'))
  return localStorage.getItem('role');
  return '';
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
    isLogin: false
    };
  }

  
  componentDidMount = () => {
    isLogin().then(response => {
      if(response){
        this.setState({
          isLogin: true
        });
        console.log(this.state.isLogin)
      }
    });
  }

render() {

  const { history } = this.props;

const Logout = () => {
  try {
    const response = axios({
      method :'POST',
      url :'http://127.0.0.1:8000/api/auth/logout',
      headers : {'Accept':'application/json'},
      params : {'token':localStorage.getItem('token')}
    })
    console.log(response);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push('/');
  } catch (error) {
    console.error(error);
  }
}



  return (<Router>
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top mb-5 shadow-sm p-3 mb-5 bg-white rounded">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Signalisation</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

    <ul className="navbar-nav ml-auto">
      {
       this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/dashboard"}>Dashboard</Link>
         </li>
       : null
      }

      {
       getRole() == 'interventionteam' && this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/chef-intervention"}>Interventions</Link>
         </li>
       : null
      }

      {
       getRole() == 'interventionteam' && this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/membre"}>Membres</Link>
         </li>
       : null
      }

      {
       getRole() == 'manager' && this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/interventions"}>Interventions</Link>
         </li>
       : null
      }

      {
       getRole() == 'manager' && this.state.isLogin
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/equipes"}>Equipe</Link>
        </li>
       : null
      }

      {
       (getRole() == 'manager'  || getRole() == 'interventionteam') && this.state.isLogin
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/contact"}>Contact</Link>
        </li>
       : null
      }

      {
       getRole() == 'manager' && this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/signalisations"}>Signalisation</Link>
         </li>
       : null
      }

      {
       getRole() == 'student' || getRole() == 'teacher' || getRole() == 'ats' && this.state.isLogin
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/comments"}>All comments</Link>
         </li>
       : null
      }

      {
       getRole() == 'adminstrator' && this.state.isLogin
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/new"}>New User</Link>
         </li>
       : null
      }

      {
       getRole() == 'adminstrator' && this.state.isLogin
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/users"}>All users</Link>
         </li>
       : null
      }

      {
       getRole() == 'student' || getRole() == 'teacher' || getRole() == 'ats' && this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/history"}>History</Link>
         </li>
       : null
      }

      {
       getRole() == 'student' || getRole() == 'teacher' || getRole() == 'ats' && this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/all"}>All Signale</Link>
         </li>
       : null
      }

      {
       getRole() == 'student' || getRole() == 'teacher' || getRole() == 'ats' && this.state.isLogin
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/signaler"}>Signaler</Link>
         </li>
       : null
      }
      
      <li className="nav-item">
        <button type="button" class="btn btn-sm btn-outline-info mr-2">
        Appelez nous  <span class="badge badge-info"> 0712548569</span>
        </button>
      </li>

      {
        this.state.isLogin
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/profile"}><i className="fas fa-user"></i> Profile</Link>
         </li>
       : <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/signup"}>S'inscrire</Link>
         </li>
      }
      
      {
        this.state.isLogin
       ?  <li className="nav-item">
            <button type="submit" className="btn btn-sm btn-outline-info" onClick={Logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
          </li>
       :  <li className="nav-item">
            <Link className="btn btn-sm btn-outline-info mr-2" to={"/login"}>Se connecter</Link>
          </li>
      }
    </ul>
          </div>
        </div>
      </nav>
      
      <div className="container-fluid m-0 p-5">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/equipes" exact component={Equipes} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/membre" exact component={Membre} />
        <Route path="/equipe/single/:id" exact component={Equipe} />
        <Route path="/signalisations" exact component={Signalisations} />
        <Route path="/signale/single/:id" exact component={Signale} />
        <Route path="/view/single/:id" exact component={View} />
        <Route path="/interventions" exact component={Interventions} />
        <Route path="/intervention/single/:id" exact component={Intervention} />
        <Route path="/chef-intervention" exact component={InterChef} />
        <Route path="/chef-intervention/single/:id" exact component={InterSingle} />
        <Route path="/users" exact component={AllUsers} />
        <Route path="/new" exact component={NewUser} />
        <Route path="/user/single/:id" exact component={User} />
        <Route path="/signaler" exact component={Signaler} />
        <Route path="/all" exact component={All} />
        <Route path="/history" exact component={History} />
        <Route path="/comments" exact component={Comments} />
        <Route path="/comment/:id" exact component={Comment} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
      </div>

      <div className="col-md-12 bg-info rounded">   
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-5 text-center text-white font-weight-bold">You can easly contact us using Mail or Fix telephone</h1>
                    <p className="lead text-sm text-center text-white font-weight-bold">Mail : services@usthb.dz</p>
                    <p className="lead text-sm text-center text-white font-weight-bold">Fix : 0612454545455</p>
                </div>
            </div>
      </div>

  <div className="container">

   <div className="row">
    <div className="col-md-4 p-3"> 
      <p className="text-sm-left font-weight-bold text-info">About us</p>
      <p className="text-sm-left">Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his fortune changes.</p>
    </div>
    <div className="col-md-8"> 
        <div className="jumbotron jumbotron-fluid p-0">
            <div className="container">
                <h1 className="display-5 text-center font-weight-bold text-info">Signalisation of problemes.</h1>
                <p className="lead text-center">follow thousands of problemes for free with limited ads.
                    <img src="background.png" className="mt-2 rounded w-75 h-100 text-center" alt=""/>
                </p>
                
            </div>
        </div>
    </div>
   </div>
   </div>

          
    </div><Footer /></Router>
  );
}
}

export default App;