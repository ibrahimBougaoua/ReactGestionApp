import React from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';

function List(props){
const listItems = (elements) => { 
    return ( elements.map((element) => 
    <div className="card mb-0">
        <img key={element['name']} src={'http://127.0.0.1:8000/storage/images/' + element['name']} className="card-img rounded-0" alt="..."/>
        <div className="card-body">
        <h5 className="card-title text-info">Nature : {element['nature']}</h5>
        <p className="card-text text-sm text-secondary">Cause : {element['cause']}</p>
        <p className="card-text text-sm text-secondary">Description : {element['desc']}</p>
        <p className="card-text text-sm text-secondary">auteur(e) : {element['user_name']}</p>
        <p className="card-text text-sm text-secondary">créé le : {Moment(element['created_at']).format('DD-MM-YYYY')}</p>
        <Link to={'/single/' + element['id']} className="btn btn-sm btn-outline-info">Lire la suite</Link>
        </div>
    </div>
));
}

return <div>



</div>
;

}

export default List;