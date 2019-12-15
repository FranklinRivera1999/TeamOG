import React, { Component } from 'react'
import Axios from 'axios';

import CONFIG from '../Configuracion/Config';
import TipoBusqueda from './TipoBusqueda';


export default class Busqueda extends Component {

    state = {
        recursos: [],
        estados: [],
        conceptos: [],
        anotaciones: [],
        tipo_tramites: [],
        numero: 0,
        nombre: '',
        concepto: 0,
        tramite: '',
        fechaTramite: new Date(),
        fechaAsignacion: new Date(),
        recurso: 0,
        anotacion: 0,
        estado: 0,
        idPersona: 0,
        observacion: '',
        informacionPersona: {},
        informacionAlumno:{},
        error: 0,
        respuesta: []
    };

    crearPersona = async (a) =>{
        this.setState({error : 1})
        this.setState({informacionPersona: {}})
        const resdos = await Axios.get(CONFIG+'alumno/alumnoprograma/programa/leer/restringido/'+a.toUpperCase())
        console.log(resdos)
        if (resdos.data.length === 1) {
            this.setState({informacionAlumno: resdos.data[0]})
            this.setState({idPersona: resdos.data[0].persona_id})
            this.setState({error : 4})
           
        }else {
            console.log('empezando a leer en la tabla personas')
            
            const res = await Axios.get(CONFIG+'Persona/lista/'+a.toUpperCase())
            console.log(res)
            if(res != null){
                this.setState({informacionPersona: res.data})
                this.setState({idPersona: res.data.persona_id})
                this.setState({error : 3}) 
            }
        }
    }

    onSubmit = async e =>{
        e.preventDefault();
        if(this.state.idPersona === 0){
            console.log('falta la persona')
        }else{
            console.log('Empezando a wardar la cabezera')
            console.log(this.state.numero+'-'+
                this.state.fechaTramite+'-'+
                this.state.idPersona+'-'+
                this.state.tramite+'-'+
                this.state.estado)
        this.setState({fechaAsignacion: new Date()})
        const res = await Axios.post(CONFIG+'Expediente_cab/registrarExpediente_cab',{ 
            n_expedediente:this.state.numero,
            f_expediente:this.state.fechaTramite,
            persona_id:this.state.idPersona,
            id_tipotramite:this.state.tramite,
            estado_id:this.state.estado
        })
        console.log(res)
        console.log(res.data.id_expediente)
        console.log('Guardando expediente')
        console.log(this.state)
       const ras =  await Axios.post(CONFIG+'Expediente_det/guardarExpediente_det',{
            id_expediente: res.data.id_expediente,
            persona_id:2154,
            id_anotacion:this.state.anotacion,
            estado_id: this.state.estado,
            f_asignacion:this.state.fechaAsignacion,
            observaciones:this.state.observacion
        })  
        console.log('TRAMITE AGREGADO')
        }
    }


    handleChange = e =>{
        
       this.setState({
         [e.target.name]: e.target.value ,
      })
      
    }

     getTipoTramites= async()=>{
        const resTipoTramite = await Axios.get(CONFIG+'Tipo_tramite/lista')
        this.setState({tipo_tramites: resTipoTramite.data})  
    }

    getEstados = async()=>{
        const resEstado= await Axios.get(CONFIG+'Estado/lista')
        this.setState({estados: resEstado.data})
    }
    getConceptos = async ()=>{
        const resConceptos = await Axios.get(CONFIG+'concepto/conceptos')
        this.setState({conceptos: resConceptos.data})
    }
    getAnotaciones = async () =>{
        const resAnotacion = await Axios.get(CONFIG+'Anotacion/lista')
        console.log(CONFIG+'Anotacion/lista')
        this.setState({anotaciones: resAnotacion.data})
    }
    getRecursos = async ()=>{
        const resRecursos = await Axios.get(CONFIG+'administrativo/lista')
        this.setState({recursos: resRecursos.data})
    }

    error = () =>{
        return(
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Ocurrio un Error!</strong> No se pudo realizar la consulta
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        )
    }

    exito = () => {
        return(
        <div className="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Consulta Exitosa!</strong> Consulta realizada exitosamente
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        )
    }

    InformacionPersona =  ()=>{
        if(this.state.error === 0){
            return  (<span></span>)
        }else{
           if( this.state.error === 1){
            return  (
            <div className="col-sm-8 offset-md-2"><this.error/></div>)
           }
           else{
                if (this.state.error ===3){
                        return (
                            <div className="col-sm-8 offset-md-2">
                                <this.exito/>
                            <div className="card ">
                            <div className="card-body">
                                <h5 className="card-title">Informacion de la Persona</h5>
                                <p className="card-text">Apellidos y Nombres : {this.state.informacionPersona.persona_apaterno + ' '
                                + this.state.informacionPersona.persona_amaterno + ' ' + this.state.informacionPersona.persona_nombres} </p>
                            </div>
                            </div>
                            </div>
                    )
                }
                else {
                    return (
                        <div className="col-sm-8 offset-md-2">
                        <this.exito/>
                    <div className="card ">
                    <div className="card-body">
                        <h5 className="card-title">Informacion Alumno:</h5>
                        <p className="card-text">Codigo : {this.state.informacionAlumno.codAlumno+'          Siglas del Programa: '+this.state.informacionAlumno.siglaPrograma}</p>
                        <p className="card-text">Apellidos y Nombres : {this.state.informacionAlumno.apeNom} </p>
                    </div>
                    </div>
                    </div>
                    )
                }
           }
        }
    }
    

    componentDidMount(){
        this.getAnotaciones()
        this.getConceptos()
        this.getEstados()
        this.getRecursos()
        this.getTipoTramites()
    }

    render() {
        return (
            <div>
                 <TipoBusqueda agregarPersona={this.crearPersona} getTramite={this.props.getTramite} className="py4 px-4"/>
                 <this.InformacionPersona className="py-1"/>
                <div className="form-group py-1">
                
                <form onSubmit={this.onSubmit}>
                <table className="table" >
                    <thead>
                        <tr>
                        <th scope="col">Número</th>
                        <th scope="col">Concepto</th>
                        <th scope="col">Trámite</th>
                        <th scope="col">Fecha del Trámite</th>
                        <th scope="col">Recurso</th>
                        <th scope="col">Anotación</th>
                        <th scope="col">Estado</th>                   
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        
                        <th><input type="text" name="numero" onChange={this.handleChange} required className="form-control form-control-sm" /></th>
                        <td>
                            <div className="">
                            <select disabled name="concepto" onChange={this.handleChange} className="custom-select custom-select-sm">
                            <option value="" selected>Sin concepto</option>
                            {
                                this.state.conceptos.map(concepto => 
                                    <option value={concepto.idConcepto}>{concepto.concepto}</option>)
                            }
                            </select> 
                            </div>
                        </td>
                        <td> <div className="">
                            <select name="tramite" onChange={this.handleChange} required className="custom-select custom-select-sm">
                            <option value="" disabled selected>Eliga una opción</option>
                            {
                                this.state.tipo_tramites.map(tipo => 
                                    <option value={tipo.id_tipotramite}>{tipo.desc_tipotramite}</option>)
                            }
                            </select> 
                            </div>
                        </td>
                        <td><input type="date" onChange={this.handleChange} name="fechaAsignacion" required className="form-control form-control-sm"/></td>
                        <td> <select name="recurso" onChange={this.handleChange} required className="custom-select custom-select-sm">
                            <option value="null" disabled selected>Elija una Opcion</option>
                            {
                                this.state.recursos.map(recurso => 
                                    <option value={recurso.idAdmin}>{recurso.nombres}</option>)
                            }
                            </select> 
                        </td>
                        <td> 
                        <select name="anotacion" onChange={this.handleChange}  className="custom-select custom-select-sm">
                            <option value="" disabled selected>Eliga una opción</option>
                            {
                                this.state.anotaciones.map(anotacion => 
                                    <option value={anotacion.id_anotacion}>{anotacion.desc_anotacion}</option>)
                            }
                            </select> 
                        </td>
                        <td> <select name="estado" onChange={this.handleChange} required className="custom-select custom-select-sm">
                            <option value="" disabled selected>Eliga una opción</option>
                            {
                                this.state.estados.map(estado => 
                                    <option value={estado.estado_id}>{estado.estado_descripcion}</option>)
                            }
                            </select> 
                        </td>
                        </tr>
                    </tbody>
                </table>
                <div  className="col-sm-12">
                <label for="exampleFormControlTextarea1"><strong>Observación : </strong></label>
                <textarea name="observacion" className="form-control" onChange={this.handleChange}  id="exampleFormControlTextarea1" cols="10" rows="2"></textarea>
                </div>
                <div className="col-sm-6 offset-sm-3 py-1">
                <button type="submit" className="btn btn-success btn-lg btn-block">Agregar Trámite</button>
                </div>
            </form>
            </div>  

            </div>
        )
    }
}
