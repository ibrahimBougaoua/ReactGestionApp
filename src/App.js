import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Signalisations from "./components/signalisations";
import Signale from "./components/signale";
import View from "./components/view";
import Interventions from "./components/interventions";
import Intervention from "./components/intervention";
import NewUser from "./components/users";
import AllUsers from "./components/allUsers";
import User from "./components/user";
import Signaler from "./components/signaler";
import History from "./components/history";
import All from "./components/all";
import Dashboard from "./components/dashboard";

function getRole() {
  if(localStorage.getItem('role'))
  return localStorage.getItem('role');
  return '';
}

function HasLogin() {
  if(localStorage.getItem('token'))
  return true;
  return false;
}

function aboutUs(){
  return (<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-info" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>);
}

function App() {
 
const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  window.location.replace("/")
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

          <ul className="navbar-nav">
            <li className="nav-item">
              <button type="button" class="btn btn-sm btn-outline-info" data-toggle="modal" data-target="#exampleModalCenter">About us</button>
            </li>
          </ul>

    <ul className="navbar-nav ml-auto">
      {
       HasLogin()
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/dashboard"}>Dashboard</Link>
         </li>
       : null
      }

      {
       getRole() == 'equipeintervention'
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/interventions"}>Interventions</Link>
         </li>
       : null
      }

      {
       getRole() == 'gestionnaire'
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/equipes"}>Equipe</Link>
        </li>
       : null
      }

      {
       getRole() == 'gestionnaire'
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/contact"}>Contact</Link>
        </li>
       : null
      }

      {
       getRole() == 'gestionnaire'
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/signalisations"}>Signalisation</Link>
         </li>
       : null
      }

      {
       getRole() == 'adminstrator'
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/new"}>New employee</Link>
         </li>
       : null
      }

      {
       getRole() == 'adminstrator'
       ? <li className="nav-item">
          <Link className="btn btn-sm btn-outline-info mr-2" to={"/employees"}>All employees</Link>
         </li>
       : null
      }

      {
       getRole() == 'etudiant' || getRole() == 'prof'
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/history"}>History</Link>
         </li>
       : null
      }

      {
       getRole() == 'etudiant' || getRole() == 'prof'
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/all"}>All Signale</Link>
         </li>
       : null
      }

      {
       getRole() == 'etudiant' || getRole() == 'prof'
       ? <li className="nav-item">
           <Link className="btn btn-sm btn-outline-info mr-2" to={"/signaler"}>Signaler</Link>
         </li>
       : null
      }
      
      <li className="nav-item">
        <button type="button" class="btn btn-sm btn-outline-info mr-2">
          Call us  <span class="badge badge-info"> 0712548569</span>
        </button>
      </li>

      {
       ! HasLogin()
       ? <li className="nav-item">
         <Link className="btn btn-sm btn-outline-info mr-2" to={"/login"}>Login</Link>
         </li>
       : <li className="nav-item">
         <Link className="btn btn-sm btn-outline-info mr-2" to={"/profile"}><i className="fas fa-user"></i> Profile</Link>
         </li>
      }
      {
       ! HasLogin()
       ? <li className="nav-item">
         <Link className="btn btn-sm btn-outline-info mr-2" to={"/signup"}>Sign up</Link>
         </li>
       : <li className="nav-item">
         <button type="submit" className="btn btn-sm btn-outline-info" onClick={Logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
         </li>
      }
    </ul>
          </div>
        </div>
      </nav>
      
      {aboutUs()}
      
      <div className="container-fluid m-0 p-5">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/equipes" exact component={Equipes} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/equipe/single/:id" exact component={Equipe} />
        <Route path="/signalisations" exact component={Signalisations} />
        <Route path="/signale/single/:id" exact component={Signale} />
        <Route path="/view/single/:id" exact component={View} />
        <Route path="/interventions" exact component={Interventions} />
        <Route path="/intervention/single/:id" exact component={Intervention} />
        <Route path="/employees" exact component={AllUsers} />
        <Route path="/new" exact component={NewUser} />
        <Route path="/employee/single/:id" exact component={User} />
        <Route path="/signaler" exact component={Signaler} />
        <Route path="/all" exact component={All} />
        <Route path="/history" exact component={History} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
      </div>

      <div className="col-md-12 bg-info rounded">   
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-5 text-center text-white font-weight-bold">You can easly contact us using Mail or Fix telephone</h1>
                    <p className="lead text-center text-white font-weight-bold">Mail : services@usthb.dz</p>
                    <p className="lead text-center text-white font-weight-bold">Fix : 0612454545455</p>
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

export default App;