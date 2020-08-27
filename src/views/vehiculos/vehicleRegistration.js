import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import {withRouter} from 'react-router-dom'
import * as messages from '../../components/toastr'

import {AuthContext} from '../../main/authenticationProvider'
import VehicleService from '../../app/service/vehicleService'

class VehicleRegistration extends React.Component{

    state = {
        id: null,
        modelVehicle: '',
        licensePlate: '',
        manufacturer: '',
        purchasePrice: '',
        saleValue: '',
        purchaseDate: '',
        saleDate: '' ,   
        situation: '',
        updating: false
    }


    constructor(){
        super();
        this.service = new VehicleService();
    }


    /*componentDidMount(){
        const params = this.props.match.params
        if(params.id){
            this.service
                .takeId(params.id)
                .then(response => {
                    this.setState( {...response.data} )
                })
                .catch(error => {
                    messages.messageError(error.response.data)
                })

        }


    }*/


    submit = () => {
        const userLogin = this.context.userAtenticate 

        const{modelVehicle ,
                licensePlate,
                manufacturer,
                purchasePrice,
                saleValue,
                purchaseDate,
                saleDate ,   
                situation} = this.state;

        const vehicle = {modelVehicle ,
                        licensePlate,
                        manufacturer,
                        purchasePrice,
                        saleValue,
                        purchaseDate,
                        saleDate ,   
                        situation,
                        user: userLogin}
        
        this.service
            .save(vehicle)
            .then(response => {
                this.props.history.push('/listar_veiculos')
                messages.messageSuccess("Veículo cadastrado com sucesso!")
            }).catch(error => {
                messages.messageError(error.response.data)
            })       
    }

    updateVehicle =() => {

        const{modelVehicle ,
            licensePlate,
            manufacturer,
            purchasePrice,
            saleValue,
            purchaseDate,
            saleDate ,   
            situation,
            id} = this.state;

        const vehicle = {modelVehicle ,
                        licensePlate,
                        manufacturer,
                        purchasePrice,
                        saleValue,
                        purchaseDate,
                        saleDate ,   
                        situation,
                        id}

        try{
            this.service.validate(vehicle)
        }catch(error){
            const messages = error.messages;
            messages.forEach(msg => messages.messageError(msg));
            return false;
        }
        
        this.service
            .updateVehicle(vehicle)
            .then(response => {
                this.props.history.push('/listar_veiculos')
                messages.messageSuccess("Veículo atualizado com sucesso!")
            }).catch(error => {
                messages.messageError(error.response.data)
            })       
    }

                
 



    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name] : value})
    }

    render(){
        const situation = this.service.takeListSituation()
        const manufacturer = this.service.takeListManufacturer()
        
        return(
    
            <Card title={this.state.updating ? 'Atualização de Veículo' : 'Cadastro de Veículo'}>
                <div className="row">
                    <div className="col-md-12">
                        
                    <FormGroup id="inputModelVehicle" label="Modelo do veículo *">
                            <input id="inputModelVehicle" type="text"
                                className="form-control"
                                name="modelVehicle"
                                value={this.state.modelVehicle}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputLicensePlate" label="Placa do Vehiculo *">
                            <input id="inputLicensePlate" type="text"
                                className="form-control"
                                name="licensePlate"
                                value={this.state.LicensePlate}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputManufacturer" label="Fabricante *">
                        <SelectMenu 
                            id="inputManufacturer"
                            className='form-control' 
                            lista={manufacturer} 
                            name="manufacturer"
                            value={this.state.manufacturer}
                            onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputPurchasePrice" label="Valor de compra *">
                            <input id="inputPurchasePrice"type="text" 
                                className="form-control"
                                name="purchasePrice"
                                value={this.state.purchasePrice}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputSaleValue" label="Valor de Venda">
                            <input id="inputSaleValue" type="text" 
                                className="form-control" 
                                name="saleValue"
                                value={this.state.saleValue}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputPurchaseDate" label="Data de Compra *">
                            <input id="inputPurchaseDate" type="Date" 
                                className="form-control"
                                name="purchaseDate"
                                value={this.state.purchaseDate}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputSaleDate" label="Data de Venda">
                            <input id="inputSaleDate" type="date" 
                                className="form-control" 
                                name="saleDate"
                                value={this.state.saleDate}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputSituation" label="Situação">
                        <SelectMenu 
                            id="inputSituation"
                            className='form-control' 
                            lista={situation}
                            name="situation"
                            value={this.state.situation}
                            onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    {this.state.updating ? 
                        (
                            <button onClick={this.updateVehicle} 
                                className="btn btn-success">
                                    <i className="pi pi-refresh"></i> Atualizar
                            </button>
                        ) : (
                            <button onClick={this.submit} 
                                className="btn btn-success">
                                   <i className="pi pi-save"></i> Salvar
                            </button>
                        )
                    }
                    
                    
                    <button onClick={e => this.props.history.push('/listar_veiculos')} 
                        className="btn btn-danger">
                             <i className="pi pi-times"></i> Cancelar
                    </button>
                    </div>
                </div>
            </Card>
        )
    }

}

VehicleRegistration.contextType = AuthContext;


export default withRouter(VehicleRegistration)
