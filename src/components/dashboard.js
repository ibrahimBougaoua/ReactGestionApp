import React, { Component} from "react";
import { Bar,Pie,Line,HorizontalBar } from 'react-chartjs-2';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Nav from './nav';

async function checkLoginUser() {
  try {
    const response = await axios({
      method :'POST',
      url :'http://127.0.0.1:8000/api/auth/me',
      headers : {'Accept':'application/json'},
      params : {'token':localStorage.getItem('token')}
    })
    console.log('ccccccc : ' + response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

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

async function allSignalerCount() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/allsignalercount')
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

async function userSignalisationDashboard(user_id) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usersignalisationdashboard/' + user_id)
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
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercountbyrole/teacher')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function userEtudiantCountByRole() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercountbyrole/student')
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
      const response = await axios.get('http://127.0.0.1:8000/api/auth/usercountbyrole/manager')
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
}

async function allComments() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/allcomments')
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

async function interventionCountDashbordById() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/auth/interventioncountdashbordbyid/' + localStorage.getItem('id'))
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function membreCountDashboard() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/auth/membrecountdashboard/' + localStorage.getItem('id'))
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
        this.state = {hasLogin: false,labelsBar: [],dataBar: [],all: [],usersCountRec: 0,equipeCountRec: 0,signalerCountRec: 0,signalisationCountRec: 0,signalisationDashboardRec: 0,userSignalisationDashboardRec: 0,userRoleDashboardRec: 0,equipedashboardRec: 0,commentsCountRec: 0,etudiantCountRec: 0,profCountRec: 0,signalisationCommentsDashboardRec: 0,signalisationEtatAvancementDashboardRec: 0,employeeCountRec: 0,gestionnaireCountRec: 0,allSignalerCountRec: 0,allCommentsCountRec: 0,interventionCountDashbordByChefRec: 0,membreCountDashboardRec: 0}
    }

      componentDidMount = () => {
        checkLoginUser().then(response => {
          if(response){
            this.setState({
              hasLogin: true
            });
          }
        });
        usersCount().then(response => {
          if(response){
            this.setState({
                usersCountRec: response.data.data
            });
          }
        });
        equipeCount().then(response => {
          if(response){
            this.setState({
                equipeCountRec: response.data.data
            });
          }
        });
        signalerCount(localStorage.getItem('id')).then(response => {
          if(response){
            this.setState({
                signalerCountRec: response.data.data
            });
          }
        });
        commentsCountDashboard(localStorage.getItem('id')).then(response => {
          if(response){
            this.setState({
                commentsCountRec: response.data.data
            });
          }
        });
        userProfCountByRole().then(response => {
          if(response){
            this.setState({
                profCountRec: response.data.data
            });
          }
        });
        userEtudiantCountByRole().then(response => {
          if(response){
            this.setState({
                etudiantCountRec: response.data.data
            });
          }
        });
        signalisationCount().then(response => {
          if(response){
            this.setState({
                signalisationCountRec: response.data.data
            });
          }
        });
        allSignalerCount().then(response => {
          if(response){
            this.setState({
                allSignalerCountRec: response.data.data
            });
          }
        });
        signalisationDashboard().then(response => {
          if(response){
            this.setState({
                signalisationDashboardRec: response.data
            });
          }
        });
        userSignalisationDashboard(localStorage.getItem('id')).then(response => {
          if(response){
            this.setState({
                userSignalisationDashboardRec: response.data.data
            });
          }
        });
        userRoleDashboard().then(response => {
          if(response){
            this.setState({
                userRoleDashboardRec: response.data
            });
          }
        });
        equipeDashboard().then(response => {
          if(response){
            this.setState({
                equipedashboardRec: response.data.data
            });
          }
        });
        signalisationCommentsDashboard().then(response => {
          if(response){
            this.setState({
                signalisationCommentsDashboardRec: response.data
            });
          }
        });
        signalisationEtatAvancementDashboard().then(response => {
          if(response){
            this.setState({
                signalisationEtatAvancementDashboardRec: response.data
            });
          }
        });
        userEmployeeCountByRole().then(response => {
          if(response){
            this.setState({
                userEmployeeCountByRole: response.data.data
            });
          }
        });
        userGestionnaireCountByRole().then(response => {
          if(response){
            this.setState({
                gestionnaireCountRec: response.data.data
            });
          }
        });
        allComments().then(response => {
          if(response){
            this.setState({
                allCommentsCountRec: response.data.data
            });
          }
        });
        interventionCountDashbordById().then(response => {
          if(response){
            this.setState({
              interventionCountDashbordByChefRec: response.data.data
            });
          }
        });
        
        membreCountDashboard().then(response => {
          if(response){
             this.setState({
              membreCountDashboardRec: response.data.data
             });
          }
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
            //label: Object.keys(this.state.userRoleDashboardRec).map(function(key) {return key;}),
            label: ['Administrateur','ATS',"chef équipe",'Gestionnaire','Étudiants','Enseignants'],
            data: Object.values(this.state.userRoleDashboardRec).map(function(value) {return value;}),
            fill: false,          // Don't fill area under the line
            backgroundColor: '#17a2b8',
            borderColor: '#17a2b8',
            hoverBackgroundColor: '#17a2b8',
            hoverBorderColor: '#17a2b8',
          }
        ]
      }

return (
<div className="container mt-5">
    <Nav name="Tableau de bord" />

<div className="row">
        
    { getRole() == 'interventionteam'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Interventions</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.interventionCountDashbordByChefRec}</div>
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

        { getRole() == 'interventionteam'
              ? <div className="col-md-3 mb-4">
              <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Membre</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.membreCountDashboardRec}</div>
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

        { getRole() == 'manager' || getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Utilisateurs</div>
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

        { getRole() == 'manager' || getRole() == 'adminstrator'
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

{ getRole() == 'manager' || getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
  <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-sm font-weight-bold text-info text-uppercase mb-1">Signalisation</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.allSignalerCountRec}</div>
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

{ getRole() == 'manager' || getRole() == 'adminstrator'
          ? <div className="col-md-3 mb-4">
  <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-sm font-weight-bold text-info text-uppercase mb-1">Commentaires</div>
          <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.allCommentsCountRec}</div>
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

        { getRole() == 'teacher' || getRole() == 'student' || getRole() == 'ats'
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
        
        { getRole() == 'teacher' || getRole() == 'student' || getRole() == 'ats'
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

        { getRole() == 'adminstrator s'
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

        { getRole() == 'adminstrator s'
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

        { getRole() == 'adminstrator s'
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


{ getRole() == 'teacher' || getRole() == 'student' || getRole() == 'interventionteam' || getRole() == 'ats'
          ? <div className="col-md-3 mb-4">
  <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Student</div>
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

        { getRole() == 'teacher' || getRole() == 'student' || getRole() == 'interventionteam' || getRole() == 'ats'
          ? <div className="col-md-3 mb-4">
          <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Teachers</div>
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


{ getRole() == 'manager' || getRole() == 'adminstrator'
? <div className="col-md-12">
     <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
         <Bar data={barRole} />
     </div>
   </div>
   : null
   }

   { getRole() == 'teacher' || getRole() == 'student' || getRole() == 'ats'
      ? <div className="col-md-6">
           <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
               <Bar data={bar} />
           </div>
         </div>
         : null
         }
        { getRole() == 'teacher' || getRole() == 'student' || getRole() == 'ats'
        ? <div className="col-md-6">
        <div className="card border-left-primary shadow h-100 py-2 bg-white border-0">
            <Pie data={pie} />
        </div>
      </div>
      : null
      }

      { getRole() == 'teacher' || getRole() == 'student' || getRole() == 'ats'
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