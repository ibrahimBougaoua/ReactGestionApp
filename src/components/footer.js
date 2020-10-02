import React from "react";

function Footer(){
    return <footer className="m-0 p-0">
          <div className="container">

<div className="row">
 <div className="col-md-4 p-3"> 
   <p className="text-sm-left font-weight-bold text-info">À propos de nous</p>
   <p className="text-sm-left text-muted">Qui nous sommes, c'est un ensemble de différents services permettant de suivre tous les problèmes et pannes en adressant une réclamation aux responsables via l'application téléphonique ou le site internet.</p>
 </div>
 <div className="col-md-8"> 
     <div className="jumbotron jumbotron-fluid p-0">
         <div className="container">
             <h1 className="display-5 text-center font-weight-bold text-info">Signalisation des problèmes.</h1>
             <p className="lead text-center">
                 <img src="background.png" className="mt-2 rounded w-75 h-100 text-center" alt=""/>
             </p>
             
         </div>
     </div>
 </div>
</div>
</div>
                <div className="text-center p-3 text-muted" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 1px 4px"}}>
                    © 2020 Copyright : <a href="https://www.usthb.dz/" className="text-dark text-muted"> usthb.dz</a>
                </div>
            </footer>;
}
    
export default Footer;