import React, { Component} from "react";
import { Bar,Pie,Line,HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';
import Nav from './nav';

async function usersCount() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercount')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function equipeCount() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipecount')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalerCount(user_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalercount/' + user_id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function commentsCountDashboard(user_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/commentscountdashboard/' + user_id)
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalisationCount() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationcount')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalisationDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationdashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userSignalisationDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usersignalisationdashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userRoleDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/userroledashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function equipeDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/equipedashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userProfCountByRole() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercountbyrole/prof')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userEtudiantCountByRole() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercountbyrole/etudiant')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userEmployeeCountByRole() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercountbyrole/employee')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userGestionnaireCountByRole() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercountbyrole/gestionnaire')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalisationCommentsDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationcommentsdashboard')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function signalisationEtatAvancementDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/signalisationetatavancementdashboard')
      console.log(response);
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

export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {labelsBar: [],dataBar: [],all: [],usersCountRec: 0,equipeCountRec: 0,signalerCountRec: 0,signalisationCountRec: 0,signalisationDashboardRec: 0,userSignalisationDashboardRec: 0,userRoleDashboardRec: 0,equipedashboardRec: 0,commentsCountRec: 0,etudiantCountRec: 0,profCountRec: 0,signalisationCommentsDashboardRec: 0,signalisationEtatAvancementDashboardRec: 0,employeeCountRec: 0,gestionnaireCountRec: 0}
      }

      componentDidMount = () => {
        usersCount().then(response => {
            this.setState({
                usersCountRec: response.data
            });
        });
        equipeCount().then(response => {
            this.setState({
                equipeCountRec: response.data
            });
        });
        signalerCount(localStorage.getItem('id')).then(response => {
            this.setState({
                signalerCountRec: response.data
            });
        });
        commentsCountDashboard(localStorage.getItem('id')).then(response => {
            this.setState({
                commentsCountRec: response.data
            });
        });
        userProfCountByRole().then(response => {
            this.setState({
                profCountRec: response.data
            });
        });
        userEtudiantCountByRole().then(response => {
            this.setState({
                etudiantCountRec: response.data
            });
        });
        signalisationCount().then(response => {
            this.setState({
                signalisationCountRec: response.data
            });
        });
        signalisationDashboard().then(response => {
            this.setState({
                signalisationDashboardRec: response.data
            });
        });
        userSignalisationDashboard().then(response => {
            this.setState({
                userSignalisationDashboardRec: response.data
            });
        });
        userRoleDashboard().then(response => {
            this.setState({
                userRoleDashboardRec: response.data
            });
        });
        equipeDashboard().then(response => {
            this.setState({
                equipedashboardRec: response.data
            });
        });
        signalisationCommentsDashboard().then(response => {
            this.setState({
                signalisationCommentsDashboardRec: response.data
            });
        });
        signalisationEtatAvancementDashboard().then(response => {
            this.setState({
                signalisationEtatAvancementDashboardRec: response.data
            });
        });
        userEmployeeCountByRole().then(response => {
            this.setState({
                userEmployeeCountByRole: response.data
            });
        });
        userGestionnaireCountByRole().then(response => {
            this.setState({
                gestionnaireCountRec: response.data
            });
        });
      }
      
render() {

//console.log(this.state.signalisationDashboardRec)

//this.state.signalisationDashboardRec.map((element,key) =>
//<p key={key}>{element}</p>
//);

//this.state.signalisationDashboardRec.forEach(value => { console.log(value) });
//console.log(Object.keys(this.state.signalisationDashboardRec).map(function(key) {return key;}));
//console.log(Object.values(this.state.signalisationDashboardRec).map(function(value) {return value;}));
   
const bar = {
    labels: Object.keys(this.state.signalisationDashboardRec).map(function(key) {return key;}),
    datasets: [
      {
        label: Object.keys(this.state.signalisationDashboardRec).map(function(key) {return key;}),
        data: Object.values(this.state.signalisationDashboardRec).map(function(value) {return value;}),
        fill: false,          // Don't fill area under the line
        borderColor: 'black'  // Line color
      }
    ]
  }

  const pie = {
      labels: Object.keys(this.state.signalisationCommentsDashboardRec).map(function(key) {return key;}),
      datasets: [
        {
          label: Object.keys(this.state.signalisationCommentsDashboardRec).map(function(key) {return key;}),
          data: Object.values(this.state.signalisationCommentsDashboardRec).map(function(value) {return value;}),
          fill: false,          // Don't fill area under the line
          borderColor: 'black'  // Line color
        }
      ]
    }

    const line = {
        labels: Object.keys(this.state.signalisationEtatAvancementDashboardRec).map(function(key) {return key;}),
        datasets: [
          {
            label: Object.keys(this.state.signalisationEtatAvancementDashboardRec).map(function(key) {return key;}),
            data: Object.values(this.state.signalisationEtatAvancementDashboardRec).map(function(value) {return value;}),
            fill: false,          // Don't fill area under the line
            borderColor: 'black'  // Line color
          }
        ]
      }
      
      const barRole = {
        labels: Object.keys(this.state.userRoleDashboardRec).map(function(key) {return key;}),
        datasets: [
          {
            label: Object.keys(this.state.userRoleDashboardRec).map(function(key) {return key;}),
            data: Object.values(this.state.userRoleDashboardRec).map(function(value) {return value;}),
            fill: false,          // Don't fill area under the line
            borderColor: 'black'  // Line color
          }
        ]
      }

return (
<div className="container mt-5">
    <Nav name="Dashboard" />

    <div className="row">
        
        { getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Users</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.usersCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }

        { getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Equipes</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.equipeCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }

        { getRole() == 'prof' || getRole() == 'etudiant'
          ? <div className="col-md-3 mb-4">
  <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-sm font-weight-bold text-info text-uppercase mb-1">signale</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.signalerCountRec}</div>
        </div>
        <div className="col-auto">
          <i className="fas fa-user fa-2x text-muted"></i>
        </div>
      </div>
    </div>
  </div>
</div>
        : null
        }

        { getRole() == 'prof' || getRole() == 'etudiant'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Comments</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.commentsCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }
        
        { getRole() == 'adminstrator' || getRole() == 'gestionnaire'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Comments</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.commentsCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }

        { getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Signalisation</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.signalisationCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }

        { getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Employee</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.employeeCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }

        { getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Gestionnaire</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.gestionnaireCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }


{ getRole() == 'prof' || getRole() == 'etudiant' || getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
  <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Etudiants</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.etudiantCountRec}</div>
        </div>
        <div className="col-auto">
          <i className="fas fa-user fa-2x text-muted"></i>
        </div>
      </div>
    </div>
  </div>
</div>
        : null
        }

        { getRole() == 'prof' || getRole() == 'etudiant' || getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Profs</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.profCountRec}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-muted"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        : null
        }


{ getRole() == 'prof' || getRole() == 'etudiant' || getRole() == 'adminstrator'
? <div className="col-md-12">
     <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
         <Bar data={barRole} />
     </div>
   </div>
   : null
   }

   { getRole() == 'prof' || getRole() == 'etudiant'
      ? <div className="col-md-6">
           <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
               <Bar data={bar} />
           </div>
         </div>
         : null
         }
        { getRole() == 'prof' || getRole() == 'etudiant'
        ? <div className="col-md-6">
        <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <Pie data={pie} />
        </div>
      </div>
      : null
      }

      { getRole() == 'prof' || getRole() == 'etudiant'
       ? <div className="col-md-12 mt-3">
        <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <Line data={line} />
        </div>
      </div>
      : null
      }

    </div>

</div>
        );
    }
}