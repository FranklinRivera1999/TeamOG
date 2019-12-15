import React, { Component } from 'react';
import axios from 'axios';

import CONFIG from '../Configuracion/Config';

export default class TipoBusqueda extends Component {

    state = {
        alumnos: {},
        numero: '',
        nombres: '',
        apellido: '',
        idAlumno: 0,
        tramites:[],
        tramite: {},
        tramiteSeleccionado:'',
        informacionPersona:{}
    }

    handleChange = e =>{  
        this.setState({
          [e.target.name]: e.target.value ,
       }) 
     }

     verTramite = async(id) =>{
       const res =  await axios.get(CONFIG+'pJOINeJOINt//byNTramite/'+id)
       console.log(res)
       this.props.getTramite(res.data)
    }

    seleccionarTramite = (id) =>{
        this.setState({tramiteSeleccionado: id})
        this.verTramite(this.state.tramiteSeleccionado)
    }

    onSubmitnUMERO = async e =>{
        e.preventDefault()
        const res =  await axios.get(CONFIG+'pJOINeJOINt//byNTramite/'+this.state.numero)
       this.props.getTramite(res.data)
    }

     onSubmitNombres = e =>{
        e.preventDefault() 
        this.props.agregarPersona(this.state.nombres)
    }
      

    render() {
     
        return (
            <div>    
                <div className="row py-3 px-5">      
                <form onSubmit={this.onSubmitNombres}>
                    <div className="row px-4">
                        <div className="mx-2">
                            <input onChange={this.handleChange} name="nombres" className="form-control" type="text" placeholder="Ingrese Nombres"/>
                        </div>
                    <button className="btn btn-info px-4" type="submit">Buscar por Persona</button>
                    </div>
                </form>
                <form onSubmit={this.onSubmitnUMERO} className="px-8">
                    <div className="row px-6">
                    <div className="mx-2">
                        <input onChange={this.handleChange} name="numero" className="form-control" type="text" placeholder="Ingrese Expediente"/> 
                    </div>
                    <button className="btn btn-info px-4" type="submit">Buscar Expediente</button> 
                    </div>
                </form>
                </div>  
            </div>
        )
    }
}
