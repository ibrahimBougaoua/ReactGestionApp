import React from "react";
import { Link } from "react-router-dom";

function Nav(props){

return <nav className="navbar navbar-expand-sm navbar-light bg-white shadow mb-4">
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
	  <Link className="nav-link" to={"/"}>Home <span class="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="aa" tabindex="-1" aria-disabled="true">/</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="aa" tabindex="-1" aria-disabled="true">{props.name}</a>
      </li>
    </ul>
  </div>
</nav>;

}

export default Nav;