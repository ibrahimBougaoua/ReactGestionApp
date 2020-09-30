import React from "react";
import { Link } from "react-router-dom";
import Moment from 'moment';

function Post(props){
const listItems = (elements) => { 
    return ( elements.map((element) => 
    <div className="card mb-0">
        <img key={element['name']} src={'http://127.0.0.1:8000/storage/images/' + element['name']} className="card-img rounded-0" alt="..."/>
        <div className="card-body">
        <h5 className="card-title text-info">Nature : {element['nature']}</h5>
        <p className="card-text text-sm text-secondary">Cause : {element['cause']}</p>
        <p className="card-text text-sm text-secondary">Description : {element['desc']}</p>
        <p className="card-text text-sm text-secondary">Auteur(e) : {element['user_name']}</p>
        <p className="card-text text-sm text-secondary">Créé le : {Moment(element['created_at']).format('DD-MM-YYYY')}</p>
        <Link to={props.link + element['id']} className="btn btn-sm btn-outline-info">Lire la suite</Link>
        </div>
    </div>
));
}

return <div>

<p className="lead text-info mt-5">{props.name}</p>

<div className="col-md-12 mt-5 mb-0 p-0">

<div className="card-deck mb-5">
    {listItems(props.elements.slice(0,5))}
</div>

<div className="card-deck">
    {listItems(props.elements.slice(5,10))}
</div>

</div>
</div>
;

}

export default Post;