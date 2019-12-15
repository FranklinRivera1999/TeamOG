import React, { Component } from 'react'

import axios from 'axios';
import CONFIG  from '../Configuracion/Config';

export default class Filtros extends Component {

    state={
        inicio: new Date(),
        final: new Date(),
        nombres: ''
    }
    

    handleChange = e =>{    
        this.setState({
          [e.target.name]: e.target.value ,
       })     
     }

     onSubmit = async e =>{
        e.preventDefault();
        const res= await axios.get(CONFIG+'expedienteTotal/listaByFecha/'+this.state.inicio+'/'+this.state.final) 
        console.log(CONFIG+'expedienteTotal/listaByFecha/'+this.state.inicio+'/'+this.state.final)
        this.props.updateTramite(res.data)
    }

    render() {
        return (
            <div className="row">    
                    <form className="form-inline mx-4" onSubmit={this.onSubmit}>
                        <div className="form-group mb-2 mx-1">
                            <label for="inicio">Inicio:</label>
                            <input type="date" className="form-control mx-1"name="inicio" id="inicio" onChange={this.handleChange}/>
                        </div>
                        <div className="form-group mb-2">
                        <label for="final">Fin:</label>
                            <input type="date" className="form-control mx-1" name="final" id="final" onChange={this.handleChange}/>
                        </div>
                        
                        <div className="form-group mb-2">
                            <button className="btn btn-success px-4" type="submit">Filtrar</button>
                        </div>
                    </form>
            </div>
        )
    }
}
