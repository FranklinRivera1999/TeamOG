import React, { Component } from 'react'
//import {Link} from 'react-router-dom';
import {Link} from 'react-router-3';
export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
            <div className="container">
                <Link className="navbar-brand" to="/"><h3 class="font-weight-bolder">Registro Interno de Expedientes</h3></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/allTramites" ><h4>Trámites</h4></Link>
                </li>
              </ul>
            </div>
            </div>
        </nav>
        )
    }
}
